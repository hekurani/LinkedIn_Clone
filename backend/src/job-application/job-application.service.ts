import {
  Body,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { application } from 'express';
import { company } from 'src/company/company.entity';
import { jobPost } from 'src/job-post/job-post.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateJobApplicationDto } from './dto/CreateJobApplicationDto.dto';
import { JobApplication } from './job-application.entity';

@Injectable()
export class JobApplicationService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(company)
    private companyRepo: Repository<company>,
    @InjectRepository(JobApplication)
    private jobapplicationrepo: Repository<JobApplication>,
    @InjectRepository(jobPost) private jobPostrepo: Repository<jobPost>,
  ) {}
  async sendJobApplication(jobPostId: number, userId: number) {
    const user = await this.usersService.findOne(userId);
    if (!user) throw new NotFoundException("There's no user with this id!");
    const jobPost = await this.jobPostrepo.findOne({
      where: { id: jobPostId },
    });
    if (!jobPost)
      throw new NotFoundException("There's no jobPost with this id!");
    if (jobPost.deadLine > new Date())
      throw new ForbiddenException(
        'You are nto allowed to send applications after deadline!',
      );

    const existingUserApplication = await this.jobapplicationrepo.findOne({
      where: { id: jobPostId, applicant: { id: userId } },
    });
    if (existingUserApplication)
      throw new ForbiddenException(
        'You cant apply for the same job more than once!',
      );
    const jobapplication = this.jobapplicationrepo.create({
      jobPost,
      applicant: user
    });

    await this.jobapplicationrepo.save(jobapplication);
    return {
      status: 'success',
      jobapplication,
    };
  }
  async getJobApplications() {
    return await this.jobapplicationrepo.find();
  }

  async getjobApplicationsByUserId(userId: number) {
    const user = await this.usersService.findOne(userId);
    if (!user) throw new NotFoundException("There's no user with this id!");

    const jobapplications = await this.jobapplicationrepo.find({
      where: { applicant: { id: userId } },
      relations: { jobPost: { company: true } },
    });

    return {
      status: 'success',
      jobapplications,
    };
  }

  async getjobApplicationsByCompanyId(userId: number) {
    const user = await this.companyRepo.findOne({
      where: { id: userId },
    });
    if (!user) throw new NotFoundException("There's no company with this id!");

    const jobapplications = await this.jobapplicationrepo.find({
      where: { jobPost: { company: { id: user.id } } },
      relations: { jobPost: { company: true } },
    });

    return {
      status: 'success',
      jobapplications,
    };
  }

  async getJobApplication(id: number) {
    const jobapplication = await this.jobapplicationrepo.findOne({
      where: { id },
    });
    if (!jobapplication)
      throw new NotFoundException("There's no jobapplciation with that id!");
    return {
      status: 'success',
      jobapplication,
    };
  }
  async deleteJobApplication(id: number, userId: number) {
    const jobApplication = await this.jobapplicationrepo.findOne({
      where: { id, applicant: { id: userId } },
    });
    if (!jobApplication)
      throw new NotFoundException("There's no jobapplciation with that id!");
    const user = await this.usersService.findOne(userId);
    if (!user) throw new NotFoundException("there's no user found!");
    await this.jobapplicationrepo.remove(jobApplication);
    return { status: 'success' };
  }
}
