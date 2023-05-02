from django.db import models
from django.utils import timezone
from django.conf import settings
from django.utils.translation import gettext_lazy as _

# Create your models here.

def upload_to(instance, filename):
    return 'posts/{filename}'.format(filename=filename)



class JobPost(models.Model):

    class PostObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status='undone')

    options=(
        ('undone','Undone'),
        ('done','Done')
    )

    title = models.CharField(max_length=50)
    image=models.ImageField(_("Image"),upload_to=upload_to,default='posts/default.jpg')
    place = models.CharField(max_length=50)
    description = models.CharField(max_length=300)
    job_date = models.DateField()
    status=models.BooleanField()
    slug=models.SlugField(max_length=250,unique_for_date='published')
    published=models.DateTimeField(default=timezone.now)
    reward = models.FloatField()
    author=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name='social_posts')
    status=models.CharField(
        max_length=50,choices=options,default='undone'
    )
    objects=models.Manager() #default manager
    postObjects=PostObjects() #custome manager

    class Meta:
        ordering=('-published',)

    def __str__(self):
        return self.title
    
class JobVerification(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    job_post = models.OneToOneField(JobPost, on_delete=models.CASCADE)
    time_created = models.DateTimeField(auto_now_add=True)
