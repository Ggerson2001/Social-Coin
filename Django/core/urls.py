
from django.contrib import admin
from django.urls import path,include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf import settings
from django.conf.urls.static import static


schema_view = get_schema_view(
   openapi.Info(
      title="Social Coin API",
      default_version='v1',
      description="List of API",

   ),
   permission_classes=(permissions.AllowAny,),
)




urlpatterns = [

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('admin/', admin.site.urls),
    
    
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('api/',include('social_api.urls',namespace='social_api')),
    path('api/user/',include('users.urls',namespace='users')),
    path('',include('social.urls',namespace='social')),
]


urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)