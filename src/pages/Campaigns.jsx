import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Plus, Send, BarChart2, Edit } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const campaigns = [
  { id: 'CAM-001', name: 'Lanzamiento de Verano 2025', status: 'Enviada', recipients: 5200, openRate: '25.4%', clickRate: '4.8%' },
  { id: 'CAM-002', name: 'Oferta Exclusiva - Black Friday', status: 'Borrador', recipients: 0, openRate: 'N/A', clickRate: 'N/A' },
  { id: 'CAM-003', name: 'Newsletter Mensual - Julio', status: 'Programada', recipients: 12500, openRate: 'N/A', clickRate: 'N/A' },
  { id: 'CAM-004', name: 'Promoción Día del Padre', status: 'Enviada', recipients: 4800, openRate: '22.1%', clickRate: '3.5%' },
];

const getStatusClasses = (status) => {
  switch (status) {
    case 'Enviada': return 'bg-green-500/20 text-green-400';
    case 'Borrador': return 'bg-yellow-500/20 text-yellow-400';
    case 'Programada': return 'bg-blue-500/20 text-blue-400';
    default: return 'bg-gray-500/20 text-gray-400';
  }
};

const Campaigns = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAction = () => {
    toast({ title: "🚧 Esta funcionalidad no está implementada aún—¡pero no te preocupes! ¡Puedes solicitarla en tu próximo prompt! 🚀" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white flex items-center">
          <Send className="mr-3 h-8 w-8" />
          Campañas
        </h1>
        <Button onClick={() => navigate('/admin/campaigns/new')} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Nueva Campaña
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Destinatarios</TableHead>
                <TableHead className="text-right">Apertura</TableHead>
                <TableHead className="text-right">Clics</TableHead>
                <TableHead><span className="sr-only">Acciones</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium text-white">{campaign.name}</TableCell>
                  <TableCell>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">{campaign.recipients.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{campaign.openRate}</TableCell>
                  <TableCell className="text-right">{campaign.clickRate}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={handleAction}>
                          <Edit className="mr-2 h-4 w-4" /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleAction}>
                          <BarChart2 className="mr-2 h-4 w-4" /> Ver Estadísticas
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Campaigns;