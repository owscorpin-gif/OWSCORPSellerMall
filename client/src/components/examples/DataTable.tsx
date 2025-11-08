import DataTable from '../DataTable';
import { Badge } from '@/components/ui/badge';

export default function DataTableExample() {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => (
        <Badge variant={value === 'active' ? 'default' : 'secondary'}>
          {value}
        </Badge>
      )
    }
  ];

  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' }
  ];

  return (
    <div className="p-8">
      <DataTable
        columns={columns}
        data={data}
        onView={(row) => console.log('View:', row)}
        onEdit={(row) => console.log('Edit:', row)}
        onDelete={(row) => console.log('Delete:', row)}
      />
    </div>
  );
}
