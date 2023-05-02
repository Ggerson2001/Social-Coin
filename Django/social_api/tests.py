from django.test import TestCase, Client
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from users.models import NewUser
from social.models import JobPost
from rest_framework.response import Response
from .serializers import JobPostSerializer
import json

class PostListTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = NewUser.objects.create_user(
            email='test@example.com',
            first_name='testing',
            user_name='testuser',
            password='testpass'
        )
        self.admin_user = NewUser.objects.create_superuser(
            email='admin@example.com',
            first_name='admin',
            user_name='adminuser',
            password='adminpass'
        )
        self.post = JobPost.objects.create(
            title='Test Post',
            place='Test Place',
            description='Test Description',
            job_date='2023-04-25',
            status='undone',
            reward=100.0,
            author=self.user,
            image=''
        )

    def test_post_list_authenticated(self):
        """
        Test that authenticated users can retrieve a list of job posts
        """
        url = reverse('social_api:listcreate')
        self.client.force_authenticate(user=self.user)
        response = self.client.get(url,format='json')
        data=json.loads(response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        serialized_data = JobPostSerializer(self.post).data
        self.assertEqual(data[0], serialized_data)

    def test_post_list_unauthenticated(self):
        """
        Test that unauthenticated users cannot retrieve a list of job posts
        """
        url = reverse('social_api:listcreate')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_post_list_admin(self):
        """
        Test that admins can retrieve a list of all job posts
        """
        url = reverse('social_api:listcreate')
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get(url,format='json')
        data=json.loads(response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        serialized_data = JobPostSerializer(self.post).data
        self.assertEqual(data[0], serialized_data)


class JobPostDetailTest(APITestCase):
    """ Test module for JobPost detail """

    def setUp(self):
        self.client = APIClient()
        self.user = NewUser.objects.create_user(
            email='test@example.com',
            first_name='testing',
            user_name='testuser',
            password='testpass'
        )
        self.admin_user = NewUser.objects.create_superuser(
            email='admin@example.com',
            first_name='admin',
            user_name='adminuser',
            password='adminpass'
        )
        self.post = JobPost.objects.create(
            title='Test Post',
            place='Test Place',
            description='Test Description',
            job_date='2023-04-25',
            status='undone',
            reward=100.0,
            slug='test-post',
            author=self.user,
            image=''
        )
        self.client.force_authenticate(user=self.user)

    def test_get_valid_single_jobpost(self):
        """ Test getting a single JobPost with a valid ID """
        response = self.client.get(reverse('social_api:detailcreate', kwargs={'pk': self.post.slug}))
        jobpost = JobPost.objects.get(slug=self.post.slug)
        serializer = JobPostSerializer(jobpost)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_invalid_single_jobpost(self):
        """ Test getting a single JobPost with an invalid ID """
        response = self.client.get(reverse('social_api:detailcreate', kwargs={'pk': 'invalid-slug'}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)





class CreatePostTest(TestCase):
    
    def setUp(self):
        self.client = APIClient()
        self.user = NewUser.objects.create_superuser(
            email='admin@example.com',
            first_name='admin',
            user_name='adminuser',
            password='adminpass'
        )
        self.client.force_authenticate(user=self.user)

    def test_create_post_valid_data(self):
        url = reverse('social_api:createpost')
        data = {
            'title': 'New Job',
            'image': '',
            'place': 'New York',
            'description': 'This is a new job',
            'job_date': '2023-05-01',
            'reward': 1000,
            'status': 'undone',
            'slug': 'new-job',
            'author': self.user.id
        }
        response = self.client.post(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(JobPost.objects.count(), 1)
        self.assertEqual(JobPost.objects.first().title, 'New Job')

    def test_create_post_invalid_data(self):
        url = reverse('social_api:createpost')
        data = {
            'title': '',
            'place': '',
            'description': '',
            'job_date': '',
            'reward': '',
            'status': '',
            'slug': '',
            'author': ''
        }
        response = self.client.post(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(JobPost.objects.count(), 0)

class EditPostTestCase(APITestCase):

    def setUp(self):
        self.user1 = NewUser.objects.create_user(
            email='test@example.com',
            first_name='testing',
            user_name='testuser',
            password='testpass'
        )
        self.user2 = NewUser.objects.create_user(
            email='admin@example.com',
            first_name='admin',
            user_name='adminuser',
            password='adminpass'
        )
        self.user3 = NewUser.objects.create_superuser(
            email='admin@admin.com',
            first_name='admin1',
            user_name='adminuser1',
            password='adminpass'
        )
        self.post1 = JobPost.objects.create(
            title='Test Post',
            place='Test Place',
            description='Test Description',
            job_date='2023-04-25',
            status='undone',
            reward=100.0,
            slug='test-post',
            author=self.user1,
            image=''

        )
        self.post2 = JobPost.objects.create(
            title='Test Post 2',
            place='Test Place',
            description='Test Description',
            job_date='2023-04-25',
            status='undone',
            reward=100.0,
            slug='test-post-2',
            author=self.user2,
            image=''

        )

    def test_user_can_only_edit_their_own_posts(self):
        self.client.force_authenticate(user=self.user1)
        response = self.client.put(f'admin/edit/{self.post2.id}/', {'title': 'New Title'})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(JobPost.objects.get(pk=self.post2.pk).title, 'Test Post 2')

    # def test_superuser_can_edit_any_post(self):
    #     self.client.force_authenticate(user=self.user3)
    #     response = self.client.put(f'/admin/edit/{self.post2.pk}/', {'title': 'New Title'})
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(JobPost.objects.get(pk=self.post2.pk).title, 'New Title')

    

    
class DeletePostTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = NewUser.objects.create_user(
            email='test@example.com',
            first_name='testing',
            user_name='testuser',
            password='testpass'
        )
        self.post = JobPost.objects.create(
            title='Test Post',
            place='Test Place',
            description='Test Description',
            job_date='2023-04-25',
            status='undone',
            reward=100.0,
            slug='test-post',
            author=self.user,
            image=''
        )
        self.url = reverse('social_api:deletepost', kwargs={'pk': self.post.pk})
        self.client.force_authenticate(user=self.user)

    def test_delete_post_by_author(self):
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(JobPost.objects.filter(pk=self.post.pk).exists())

    def test_delete_post_by_superuser(self):
        admin = NewUser.objects.create_superuser(
            email='admin@example.com',
            first_name='admin',
            user_name='adminuser',
            password='adminpass'
        )
        self.client.force_authenticate(user=admin)
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(JobPost.objects.filter(pk=self.post.pk).exists())

    def test_delete_post_unauthorized(self):
        self.client.logout()
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertTrue(JobPost.objects.filter(pk=self.post.pk).exists())



