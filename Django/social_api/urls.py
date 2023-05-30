
from rest_framework.routers import DefaultRouter
from .views import AdminPostDetail, CreateJobVerification, CreatePost, DeletePost, EditPost, JobVerificationList, PostList, PostDetail, PostListDetailfilter,VerificationList
from django.urls import path
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

app_name = 'social_api'



schema_view = get_schema_view(
   openapi.Info(
      title="Social Coin API",
      default_version='v1',
      description="List of API",

   ),
   public=True,
   permission_classes=(permissions.AllowAny,),


)


urlpatterns = [
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('jobpost/<int:pk>', PostDetail.as_view(), name='detailcreate'),
    path('jobposts/', PostList.as_view(), name='listcreate'),
    path('jobpost/create/', CreatePost.as_view(), name='createpost'),
    path('jobpost/detail/<int:pk>/', AdminPostDetail.as_view(), name='admindetailpost'),
    path('jobpost/edit/<int:pk>/', EditPost.as_view(), name='editpost'),
    path('jobpost/delete/<int:pk>/', DeletePost.as_view(), name='deletepost'),
    path('job-completion-request/<int:pk>/', JobVerificationList.as_view(), name='job-verification-list'),
    path('create/jobcompletion-request/<int:id>/', CreateJobVerification.as_view(), name='create-job-verification'),
    path('jobs-completed/', VerificationList.as_view(), name='verified_job_list')
]