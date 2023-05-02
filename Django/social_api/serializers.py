from rest_framework import serializers
from social.models import JobPost
from social.models import JobVerification
from users.models import NewUser

class JobPostSerializer(serializers.ModelSerializer):
    class Meta:
        model=JobPost
        fields=('id','title','place','description','slug','job_date','image','status','author','published','reward')

class JobVerificationSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()
    
    def get_author_name(self, obj):
        author_id = obj.author.id
        author = NewUser.objects.get(id=author_id)
        return author.user_name

    class Meta:
        model = JobVerification
        fields = ['id', 'author', 'author_name', 'job_post', 'time_created']

# class BentoSerializer(serializers.ModelSerializer):
#     zones = serializers.SerializerMethodField()
#     lead_zone = serializers.SerializerMethodField()

#     def get_zones(self, obj):
#         zone_queryset = obj.get_zones()
#         return serializers.ZoneSerializer(zone_queryset, many=True).data

#     def get_lead_zone(self, obj):
#         zone_queryset = obj.get_lead_zone()
#         return serializers.ZoneSerializer(zone_queryset).data

#     class Meta:
#         model = BentoSerializer
#         fields = ('lead_zone', 'zones', )