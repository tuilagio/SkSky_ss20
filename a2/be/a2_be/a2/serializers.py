from django.contrib.auth.models import User, Group
from rest_framework import serializers
from a2.models import Todo

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class TodoSerializer(serializers.Serializer):
    # id = serializers.IntegerField(read_only=True)
    # title = serializers.CharField(required=False, allow_blank=True, max_length=100)
    # code = serializers.CharField(style={'base_template': 'textarea.html'})
    # linenos = serializers.BooleanField(required=False)
    # language = serializers.ChoiceField(choices=LANGUAGE_CHOICES, default='python')
    # style = serializers.ChoiceField(choices=STYLE_CHOICES, default='friendly')
    deadline = serializers.CharField(max_length=30, allow_blank=False)
    content = serializers.CharField(allow_blank=False, max_length=1000)
    done_status = serializers.CharField(max_length=10, allow_blank=False)
    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Todo.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.deadline = validated_data.get('deadline', instance.deadline)
        instance.content = validated_data.get('content', instance.content)
        instance.done_status = validated_data.get('done_status', instance.done_status)
        instance.save()
        return instance