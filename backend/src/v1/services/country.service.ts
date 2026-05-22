import { prisma } from "../../prisma";

export class CountryService{
    async create(name: string){
        const country = await prisma.country.create({data: {name}})
        
        return {
            id: country.id,
            name: country.name,
            createdAt: country.created_at
        }
    }

    async findAll() {
        const countries = await prisma.country.findMany();
    
        return countries.map(c => ({
          id: c.id,
          name: c.name,
          createdAt: c.created_at
        }));
      }
    
      async update(id: string, name?: string) {
        const country = await prisma.country.findUnique({
          where: { id }
        });
    
        if (!country) {
          throw new Error("Country not found");
        }
    
        if (name) country.name = name;
    
        const updated = await prisma.country.update({
          where: { id },
          data: {
            name: country.name
          }
        });
    
        return {
          id: updated.id,
          name: updated.name,
          updatedAt: updated.updated_at
        };
      }
    
      async delete(id: string) {
        const country = await prisma.country.findUnique({
          where: { id }
        });
    
        if (!country) {
          throw new Error("Country not found");
        }
    
        await prisma.country.delete({
          where: { id }
        });
    
        return {
          message: "Country deleted successfully",
          id
        };
      }
    }
     


    



