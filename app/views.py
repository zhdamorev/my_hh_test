
from django.conf import settings
from django.shortcuts import render, render_to_response
from app.forms import AutoModelForm
from django.views.generic import TemplateView
from django.http import HttpResponseRedirect
from app.models import AutoModel
from django.core.urlresolvers import reverse

# Create your views here.
def change_mark(request):
    auto_id = request.POST['auto_id']
    f = AutoModel.objects.get(pk=auto_id)
    f.name = request.POST['name']
    f.save()
    return HttpResponseRedirect('/#/auto_model/auto/'+selectedAuto_id)

def add_funk(request):
    f = AutoModel(name=request.POST['name'])
    try:
     f.author = request.user
    except():
      f.author = anonymous

    f.save()
    return HttpResponseRedirect('/#/auto_model')

def index(request):
    return render_to_response('main.html')

class AutoModelFormView(TemplateView):
    # model = AutoModel
     template_name = "auto_models.add.html" 
    
     def get_context_data(self, **kwargs):
      context = super(AutoModelFormView, self).get_context_data(**kwargs)
      context.update({'form': AutoModelForm()})
      return context


