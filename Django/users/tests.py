from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

class UserDetailAPIViewTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            user_name='testuser',
            first_name='test',
            email='testuser@example.com',
            password='testpassword'
        )
        self.url = reverse('users:user-detail', kwargs={'id': self.user.id})
        self.client.force_authenticate(user=self.user)

    def test_retrieve_user_detail(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['user_name'], self.user.user_name)
        self.assertEqual(response.data['email'], self.user.email)



class LoginViewTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            user_name='testuser',
            first_name='test',
            email='testuser@example.com',
            password='testpassword'
        )
        self.url = reverse('users:login')
        self.valid_payload = {
            'email': 'testuser@example.com',
            'password': 'testpassword'
        }
        self.invalid_payload = {
            'email': 'testuser@example.com',
            'password': 'wrongpassword'
        }

    def test_valid_login(self):
        response = self.client.post(self.url, data=self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
        self.assertTrue(response.data['access'])
        self.assertTrue(response.data['refresh'])

    def test_invalid_login(self):
        response = self.client.post(self.url, data=self.invalid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertNotIn('access', response.data)
        self.assertNotIn('refresh', response.data)


