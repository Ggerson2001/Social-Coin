from rest_framework import generics
from social.models import JobPost, JobVerification
from rest_framework import viewsets
from .serializers import JobPostSerializer, JobVerificationSerializer
from rest_framework.permissions import SAFE_METHODS,BasePermission, IsAdminUser,DjangoModelPermissions,IsAuthenticatedOrReadOnly,IsAuthenticated,AllowAny
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import filters
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
import uuid

class PostUserWritePermission(BasePermission):
    message='Editing posts is restricted to the author only'

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        
        return obj.author==request.user




class PostList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = JobPostSerializer

    def get_queryset(self):
        user = self.request.user
        # if user.is_superuser:
        return JobPost.objects.all()
        # else:
        #     return JobPost.objects.filter(author=user)






class PostDetail(generics.RetrieveAPIView):

    serializer_class = JobPostSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(JobPost, slug=item)

# Post Search

class PostListDetailfilter(generics.ListAPIView):
  
    queryset = JobPost.objects.all()
    serializer_class = JobPostSerializer
    filter_backends = [filters.SearchFilter]
    # '^' Starts-with search.
    # '=' Exact matches.
    search_fields = ['^slug']

# Post Admin



class CreatePost(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        print(request.data)
        serializer = JobPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminPostDetail(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = JobPostSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return JobPost.objects.all()
        else:
            return JobPost.objects.filter(author=user)

class EditPost(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = JobPostSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return JobPost.objects.all()
        else:
            return JobPost.objects.filter(author=user)

class DeletePost(generics.RetrieveDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = JobPostSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return JobPost.objects.all()
        else:
            return JobPost.objects.filter(author=user)



class JobVerificationList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = JobVerificationSerializer

    def get_queryset(self):
        job_post_slug = self.kwargs['slug']
        job_post = get_object_or_404(JobPost, slug=job_post_slug)
        return JobVerification.objects.filter(job_post=job_post)


class CreateJobVerification(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, slug, format=None):
        job_post = get_object_or_404(JobPost, slug=slug)
        serializer = JobVerificationSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(job_post=job_post, author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        


class VerificationList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = JobPostSerializer

    def get_queryset(self):
        user = self.request.user
        verified_jobs = JobVerification.objects.filter(author=user)
        job_posts = [job_verification.job_post for job_verification in verified_jobs]
        return job_posts
        

   

