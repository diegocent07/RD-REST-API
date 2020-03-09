from leads.models import Lead
from rest_framework import viewsets, permissions
from .serializer import LeadSerializer

# Lead Viewset
class LeadViewSet(viewsets.ModelViewSet):
    #queryset = Lead.objects.all() muestra todos los objetos de lead, no estando autenticado
    permission_classes = [ permissions.IsAuthenticated]
    serializer_class = LeadSerializer

    def get_queryset(self):
        return self.request.user.leads.all() #retorna solo los leads de ese user

    def perform_create(self, serializer): #save the lead owner when we create the lead
        serializer.save(owner=self.request.user)
    
    
    