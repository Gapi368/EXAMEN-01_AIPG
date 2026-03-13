import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { FacturasService } from './facturas.service';
import { Factura } from './entities/facturas.entity';

@Controller('facturas')
export class FacturasController {
    constructor(private readonly facturasService: FacturasService) {}

    @Get()
    findAll(){
        return this.facturasService.findAll();
    }


    @Get(':id')
    findOne(@Param('id') id: number): Factura {
        return this.facturasService.findOne(+id);
    }

    @Post()
    create(@Body() nuevaFactura: Partial<Factura>): Factura {
        return this.facturasService.create(nuevaFactura);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() facturaActualizada: Partial<Factura>): Factura {
        return this.facturasService.update(+id, facturaActualizada);
    }

    @Delete(':id')
    delete(@Param('id') id: number): Factura {
        return this.facturasService.delete(+id);
    }

}
