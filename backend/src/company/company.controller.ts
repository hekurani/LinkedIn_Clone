import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCommpanyDto } from './dto/CreateCompany.dto'
import { AuthUser } from 'src/auth/decorators/AuthUser-decorator';
import { create } from 'domain';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/utils/multer/multerOptions.multer';
import { DeleteCommpanyDto } from './dto/DeleteCompany.dto';
import { UpdateCommentDto } from 'src/comments/dto/update.dto.entity';
import { UpdateCommpanyDto } from './dto/UpdateCompany.dto';

@Controller('company')
export class CompanyController {
constructor(private readonly companyService:CompanyService){}

@Post()
@UseInterceptors(FileFieldsInterceptor([
    { name: 'logo', maxCount: 1 ,},
    { name: 'imageCover', maxCount: 1 },
  ], {...multerOptions,storage:multerOptions.storage([{filename:'logo',destination:"../Images/logo"},{filename:'imageCover',destination:'../Images/imageCover'}])}))
// @UseInterceptors(FilesInterceptor({'logo',{...multerOptions,storage:multerOptions.storage("../Images/logo")}}))
// @UseInterceptors(FileInterceptor('imageCover',{...multerOptions,storage:multerOptions.storage("../Images/imageCover")}))

createCompany(@Body() createCompanyDto: CreateCommpanyDto,@AuthUser() user: {userId:number},@UploadedFiles() files: {logo?: Express.Multer.File[], imageCover?: Express.Multer.File[]}){
   
    let logo,imageCover;
    if(files){
       if(files.logo){
    logo = files.logo.find(file => file.fieldname === 'logo');
       }
       if(files.imageCover){
    imageCover = files.imageCover.find(file => file.fieldname === 'imageCover'); 
       }
    }
  
   if(logo) createCompanyDto.logo=logo.filename;
   if(imageCover) createCompanyDto.imageCover=imageCover.filename;
return this.companyService.createCompany(createCompanyDto,user.userId)
    // const logo = files.logo.find(file => file.fieldname === 'logo');
    // const imageCover = files.imageCover.find(file => file.fieldname === 'imageCover'); 
    // return this.companyService.createCompany(createCompanyDto.name,createCompanyDto.Specialities,createCompanyDto.industry_type,createCompanyDto.tagLine,createCompanyDto.yearFounded,createCompanyDto.workplace,createCompanyDto.slug,createCompanyDto.url,parseInt(createCompanyDto.cityId),createCompanyDto.hashTags,user.userId,createCompanyDto.phone_number,logo.filename,imageCover.filename)
}

@Get('/:slug')
getCompany(@Param('slug') slug: string){
return this.companyService.getCompany(slug)
}

@Get()
getCompanies(){
    return this.companyService.getCompanies();
}

@Patch('/:id')
@UseInterceptors(FileFieldsInterceptor([
    { name: 'logo', maxCount: 1 ,},
    { name: 'imageCover', maxCount: 1 },
  ], {...multerOptions,storage:multerOptions.storage([{filename:'logo',destination:"../Images/logo"},{filename:'imageCover',destination:'../Images/imageCover'}])}))
updateCompany(@Param('id') id:number,@Body() updateCompany:UpdateCommpanyDto,@UploadedFiles() files: {logo?: Express.Multer.File[], imageCover?: Express.Multer.File[]}){
     let logo,imageCover;
     if(files){
        if(files.logo){
     logo = files.logo.find(file => file.fieldname === 'logo');
        }
        if(files.imageCover){
     imageCover = files.imageCover.find(file => file.fieldname === 'imageCover'); 
        }
     }
   
    if(logo) updateCompany.logo=logo.filename;
    if(imageCover) updateCompany.imageCover=imageCover.filename;
return this.companyService.updateCompany(id,updateCompany)
}


@Delete('/:id')
deleteCompany(@Param('id') id: number,@Body() deleteCompanyDto:DeleteCommpanyDto,@AuthUser() user: {userId:number}){   
return this.companyService.deleteCompany(id,deleteCompanyDto.email,deleteCompanyDto.password,user?.userId);
}

}