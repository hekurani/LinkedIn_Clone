import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthUser } from 'src/auth/decorators/AuthUser-decorator';
import { multerOptions } from 'src/utils/multer/multerOptions.multer';
import { CompanyService } from './company.service';
import { CreateCommpanyDto } from './dto/CreateCompany.dto';
import { DeleteCommpanyDto } from './dto/DeleteCompany.dto';
import { UpdateCommpanyDto } from './dto/UpdateCompany.dto';


const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};
const storage = diskStorage({
  destination: '../', // <-- no slash at start, relative to root
  filename: (req, file, cb) => {
    const name = file.originalname.split('.')[0];
    const extension = extname(file.originalname);
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    cb(null, `/Images/logo/${name}-${randomName}${extension}`); // <-- filename only
  },
});


@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('logo', { storage, fileFilter: imageFileFilter }),
  )
  createCompany(
    @Body() createCompanyDto: CreateCommpanyDto,
    @AuthUser() user: { userId: number },
  @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) createCompanyDto.logo = `${file.filename}`;

    // if (imageCover) createCompanyDto.imageCover = imageCover.filename;
    return this.companyService.createCompany(createCompanyDto, user.userId);
  }


  @Get()
  getCompanies() {
    return this.companyService.getCompanies();
  }


  @Get('/getById')
  getCompany(@AuthUser() company: { companyId: number }) {
    return this.companyService.getCompany(company?.companyId);
  }



  @Patch('/:id')
  @UseInterceptors(
    FileInterceptor('logo', { storage, fileFilter: imageFileFilter }),
  )
  updateCompany(
    @Param('id') id: number,
    @Body() updateCompany: UpdateCommpanyDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) updateCompany.logo =  `${file.filename}`;

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
