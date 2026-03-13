import { Injectable, NotFoundException } from '@nestjs/common';
import { Factura } from './entities/facturas.entity';
@Injectable()
export class FacturasService {
    private facturas: Factura[] = [];
    private idCounter: number = 1;

    create(nuevaFactura: Partial<Factura>): Factura {
        const factura: Factura = {
            id: this.idCounter++,
            numero: nuevaFactura.numero ?? '',
            fecha: nuevaFactura.fecha ?? new Date(),
            monto: nuevaFactura.monto ?? 0,
            estado: nuevaFactura.estado ?? 'PENDIENTE'
        };
        this.facturas.push(factura);
        return factura;
    }

    findAll(): Factura[] {
        return this.facturas;
    }

    findOne(id: number): Factura {
        const factura = this.facturas.find(f => f.id === id);
        if (!factura) {
            throw new NotFoundException(`Factura con ID ${id} no encontrada`);
        }
        return factura;
    }

    update(id: number, facturaActualizada: Partial<Factura>): Factura {
        const factura = this.findOne(id);
        
        // Actualización simplificada
        Object.assign(factura, facturaActualizada);
        
        // Aseguramos que el ID no cambie por error en el Partial
        factura.id = id; 
        
        return factura;
    }

    delete(id: number): Factura {
        const index = this.facturas.findIndex(f => f.id === id);
        if (index === -1) {
            throw new NotFoundException(`Factura con ID ${id} no encontrada`);
        }
        
        // Eliminamos y retornamos en un solo paso
        const [eliminada] = this.facturas.splice(index, 1);
        return eliminada;
    }
}