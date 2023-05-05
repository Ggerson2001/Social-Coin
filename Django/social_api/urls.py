
from rest_framework.routers import DefaultRouter
from .views import AdminPostDetail, CreateJobVerification, CreatePost, DeletePost, EditPost, JobVerificationList, PostList, PostDetail, PostListDetailfilter,VerificationList
from django.urls import path

app_name = 'social_api'

# router = DefaultRouter()
# router.register('', JobPostList, basename='post')
# urlpatterns = router.urls

urlpatterns = [
    path('post/<str:pk>', PostDetail.as_view(), name='detailcreate'),
    path('search/', PostListDetailfilter.as_view(), name='postsearch'),
    path('', PostList.as_view(), name='listcreate'),

    path('admin/create/', CreatePost.as_view(), name='createpost'),
    path('admin/edit/postdetail/<int:pk>/', AdminPostDetail.as_view(), name='admindetailpost'),
    path('admin/edit/<int:pk>/', EditPost.as_view(), name='editpost'),
    path('admin/delete/<int:pk>/', DeletePost.as_view(), name='deletepost'),
    path('job-verification/<slug:slug>/', JobVerificationList.as_view(), name='job-verification-list'),
    path('create-job-verification/<slug:slug>/', CreateJobVerification.as_view(), name='create-job-verification'),
    path('jobs/verified/', VerificationList.as_view(), name='verified_job_list')
]