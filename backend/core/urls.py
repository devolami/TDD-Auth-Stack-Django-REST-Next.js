from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    # Admin urls
    path("admin/", admin.site.urls),
    
    #Authentication
    path("api/", include("djoser.urls")),
    path("api/", include("users.urls")),

]


if settings.DEBUG == False:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
