import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { company } from 'src/company/company.entity';
import { JobApplication } from 'src/job-application/job-application.entity';
import { city } from 'src/location/entity/city.entity';
import { Skill } from 'src/skills/skills.entity';
import { UsersService } from 'src/users/users.service';
import { WorkExperience } from 'src/work-experience/work-experience.entity';
import { In, Not, Repository } from 'typeorm';
import { CreateJobPostDto } from './dto/CreateJobPost.dto';
import { UpdateJobPostDto } from './dto/updateJobPost.dto';
import { jobPost } from './job-post.entity';

@Injectable()
export class JobPostService {
  constructor(
    @InjectRepository(jobPost) private jobPost: Repository<jobPost>,
    private userService: UsersService,
    @InjectRepository(company) private companyrepo: Repository<company>,
    @InjectRepository(WorkExperience)
    private workExperienceRepo: Repository<WorkExperience>,
    @InjectRepository(Skill) private skillsRepo: Repository<Skill>,
    @InjectRepository(JobApplication) private jobApplicationRepository: Repository<JobApplication>,
  ) {}
  async createJobPost(createJobPostDto: CreateJobPostDto, companyId: number) {
    const deadLine = new Date(createJobPostDto.deadLine);
    if (deadLine <= new Date())
      throw new ForbiddenException('You are entering an invalid Deadline!');

    if (createJobPostDto.minSalary) {
      if (createJobPostDto.minSalary < 0)
        throw new ForbiddenException("You can't add minSalary less than 0");
      if (
        createJobPostDto.maxSalary &&
        createJobPostDto.maxSalary < createJobPostDto.minSalary
      )
        throw new ForbiddenException(
          "You can't add minSalary greater than maxSalary",
        );
    }

    if (createJobPostDto.maxSalary && !createJobPostDto.minSalary)
      throw new ForbiddenException(
        "You can't add max Salary without minSalary",
      );

    // Fetch skills
    const skills = await Promise.all(
      createJobPostDto.skillsId.map(async (skillId) => {
        const skill = await this.skillsRepo.findOne({ where: { id: skillId } });
        if (!skill)
          throw new NotFoundException("You can't add skills that don't exist!");
        return skill;
      }),
    );



    const company = await this.companyrepo.findOne({
      where: { id: companyId },
    });
    if (!company)
      throw new NotFoundException(
        'You are not allowed to create a job post for this company!',
      );

    const jobPost = this.jobPost.create({
      ...createJobPostDto,
      company,
      deadLine,
    });

    const savedJobPost = await this.jobPost.save(jobPost);
    console.log({savedJobPost})
    return {
      status: 'success',
      savedJobPost,
    };
  }

  async getJobPost(id: number) {
    const jobPost = await this.jobPost.findOne({ where: { id } });
    return {
      status: 'success',
      jobPost,
    };
  }

async getJobPosts(userId: number) {
  const appliedJobPosts = await this.jobApplicationRepository.find({
    where: { applicant: { id: userId } },
    select: ['jobPost'],
  });

  const appliedJobPostIds = appliedJobPosts.map(application => application.jobPost.id);

  const jobPosts = await this.jobPost.find({
    where: {
      id: Not(In(appliedJobPostIds)),
    },
    relations: ['company'],
    order: { id: 'DESC' },
  });

  return {
    status: 'success',
    jobPosts,
  };
}

async getJobPostsCompany (companyId: number)  {
    const jobPosts = await this.jobPost.find({
      where: { company: { id: companyId } },
       order: { id: 'DESC' },
    });
    return {
      status: 'success',
      jobPosts,
    };
  }

  async updateJobPost(
    updateJobPostDto: UpdateJobPostDto,
    id: number,
    userId: number,
  ) {
    let jobPostObject = await this.jobPost.findOne({
      where: { id },
      relations: ['skills', 'company'],
    });
    if (!jobPostObject)
      throw new NotFoundException("there's no jobPost Found!");
    const user = await this.userService.findOne(userId);
    if (!user)
      throw new NotFoundException('User doesnt exist please login again!');

    let deadLine: Date | undefined;
    if (updateJobPostDto.deadLine) {
      deadLine = new Date(updateJobPostDto.deadLine);
      if (deadLine <= new Date())
        throw new ForbiddenException('You are entering an invalid Deadline!');
      jobPostObject.deadLine = updateJobPostDto.deadLine;
    }
    if (updateJobPostDto.minSalary) {
      if (updateJobPostDto.minSalary < 0)
        throw new ForbiddenException("You can't add minSalary less than 0");
      if (
        updateJobPostDto.maxSalary &&
        updateJobPostDto.maxSalary < updateJobPostDto.minSalary
      )
        throw new ForbiddenException(
          "You can't add minSalary greater than maxSalary",
        );
      jobPostObject.minSalary = updateJobPostDto.minSalary;
    }
    if (updateJobPostDto.role) {
      jobPostObject.role = updateJobPostDto.role;
    }
    if (updateJobPostDto.maxSalary && !updateJobPostDto.minSalary)
      throw new ForbiddenException(
        "You can't add max Salary without minSalary",
      );
    let skills = [];
    if (updateJobPostDto.skillsId && updateJobPostDto.skillsId.length) {
      skills = await Promise.all(
        updateJobPostDto.skillsId.map(async (skillId) => {
          const skill = await this.skillsRepo.findOne({
            where: { id: skillId },
          });
          if (!skill)
            throw new NotFoundException(
              "You can't add skills that don't exist!",
            );
          return skill;
        }),
      );
    }
    if (updateJobPostDto.redirectURL !== undefined) {
      jobPostObject.redirectURL = updateJobPostDto.redirectURL;
    }

    if (updateJobPostDto.workplace) {
      jobPostObject.workPlace = updateJobPostDto.workplace;
    }
    jobPostObject = await this.jobPost.save(jobPostObject);
    return {
      status: 'success',
      jobPostObject,
    };
  }
  async deleteJobPost(id: number, companyId: number) {
    const jobPost = await this.jobPost.findOne({ where: { id } });
    if (!jobPost) throw new NotFoundException("there's no jobPost found!");
    const company = await this.companyrepo.findOne({
      where: { id: companyId },
    });
    if (!company) throw new NotFoundException("There's no company found!");

    await this.jobPost.remove(jobPost);
    return {
      status: 'success',
    };
  }
}
