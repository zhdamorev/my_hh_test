from django.utils.translation import ugettext_lazy as _
from django import forms
from djangular.forms import NgFormValidationMixin, NgModelFormMixin, NgModelForm 

from .models import AutoModel


class AutoModelForm(forms.ModelForm, NgModelForm):

    class Meta:
       model = AutoModel
       exclude = ['author']
       labels = {
            'name': _('Марка автомобиля'),
        }

