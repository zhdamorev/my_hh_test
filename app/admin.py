from django.contrib import admin

# Register your models here.
from app.models import AutoModel

class AutoAdmin(admin.ModelAdmin):

    fields = ['name']
    list_display = ('name', 'author')
    def save_model(self, request, obj, form, change):
        obj.author = request.user.username
        obj.save()


admin.site.register(AutoModel, AutoAdmin)
