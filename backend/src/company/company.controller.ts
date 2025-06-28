import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCommpanyDto } from './dto/CreateCompany.dto';
import { AuthUser } from 'src/auth/decorators/AuthUser-decorator';
import {
  FileFieldsInterceptor,
} from '@nestjs/platform-express';
import { multerOptions } from 'src/utils/multer/multerOptions.multer';
import { DeleteCommpanyDto } from './dto/DeleteCompany.dto';
import { UpdateCommpanyDto } from './dto/UpdateCompany.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'logo', maxCount: 1 },
        { name: 'imageCover', maxCount: 1 },
      ],
      multerOptions(
        ['.jpg', '.jpeg', '.png', '.gif'], // Permissible file formats
        [
          { filename: 'logo', destination: '../Images/logo' }, // Destination for 'logo'
          { filename: 'imageCover', destination: '../Images/imageCover' }, // Destination for 'imageCover'
        ],
      ),
    ),
  )

  createCompany(
    @Body() createCompanyDto: CreateCommpanyDto,
    @AuthUser() user: { userId: number },
    @UploadedFiles()
    files: { logo?: Express.Multer.File[]; imageCover?: Express.Multer.File[] },
  ) {
    let logo, imageCover;
    if (files) {
      if (files.logo) {
        logo = files.logo.find((file) => file.fieldname === 'logo');
      }
      if (files.imageCover) {
        imageCover = files.imageCover.find(
          (file) => file.fieldname === 'imageCover',
        );
      }
    }

    if (logo) createCompanyDto.logo = logo.filename;
    if (imageCover) createCompanyDto.imageCover = imageCover.filename;
    return this.companyService.createCompany(createCompanyDto, user.userId);
  }

  @Get('/:slug')
  getCompany(@Param('slug') slug: string) {
    return this.companyService.getCompany(slug);
  }

  @Get()
  getCompanies() {
    return this.companyService.getCompanies();
  }

  @Patch('/:id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'logo', maxCount: 1 },
        { name: 'imageCover', maxCount: 1 },
      ],
      multerOptions(
        ['.jpg', '.jpeg', '.png', '.gif'],
        [
          { filename: 'logo', destination: '../Images/logo' },
          { filename: 'imageCover', destination: '../Images/imageCover' },
        ],
      ),
    ),
  )
  updateCompany(
    @Param('id') id: number,
    @Body() updateCompany: UpdateCommpanyDto,
    @UploadedFiles()
    files: { logo?: Express.Multer.File[]; imageCover?: Express.Multer.File[] },
  ) {
    let logo, imageCover;
    if (files) {
      if (files.logo) {
        logo = files.logo.find((file) => file.fieldname === 'logo');
      }
      if (files.imageCover) {
        imageCover = files.imageCover.find(
          (file) => file.fieldname === 'imageCover',
        );
      }
    }

    if (logo) updateCompany.logo = logo.filename;
    if (imageCover) updateCompany.imageCover = imageCover.filename;
    return this.companyService.updateCompany(id, updateCompany);
  }

  @Delete('/:id')
  deleteCompany(
    @Param('id') id: number,
    @Body() deleteCompanyDto: DeleteCommpanyDto,
    @AuthUser() user: { userId: number },
  ) {
    return this.companyService.deleteCompany(
      id,
      deleteCompanyDto.email,
      deleteCompanyDto.password,
      user?.userId,
    );
  }
}
