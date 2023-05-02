from rest_framework import serializers
from users.models import NewUser

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView



class CustomUserSerializer(serializers.ModelSerializer):
    
    email = serializers.EmailField(required=True)
    user_name = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = NewUser
        fields = ('email', 'user_name', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self,attr):
        data=super().validate(attr)
        token=self.get_token(self.user)
        data['user']=str(self.user)
        data['role']=self.user.role
        data['id']=self.user.id
        return data



