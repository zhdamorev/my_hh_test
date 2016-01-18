
from django.conf.urls import url, include

from django.contrib import admin
from app import views

from tastypie.api import Api
from app.api import *
from app.views import AutoModelFormView 



admin.autodiscover()

v1_api = Api(api_name='v1')

v1_api.register(AutoModelResource())
v1_api.register(UserResource())


urlpatterns = [

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', views.index),
    url(r'^api/', include(v1_api.urls)),
    url(r'^add/', AutoModelFormView.as_view(), name='add'),
    url(r'^add_funk/', views.add_funk, name='add_funk'),
    url(r'^change_mark/', views.change_mark, name='change_mark'),
   

]




