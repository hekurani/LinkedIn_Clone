import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { jobPost } from './job-post.entity';
import { Repository } from 'typeorm';
import { CreateJobPostDto } from './dto/CreateJobPost.dto';
import { UsersService } from 'src/users/users.service';
import { company } from 'src/company/company.entity';
import { WorkExperience } from 'src/work-experience/work-experience.entity';
import { UpdateJobPostDto } from './dto/updateJobPost.dto';
import { Skill } from 'src/skills/skills.entity';
import { city } from 'src/location/entity/city.entity';

@Injectable()
export class JobPostService {
  constructor(
    @InjectRepository(jobPost) private jobPost: Repository<jobPost>,
    private userService: UsersService,
    @InjectRepository(company) private companyrepo: Repository<company>,
    @InjectRepository(WorkExperience)
    private workExperienceRepo: Repository<WorkExperience>,
    @InjectRepository(Skill) private skillsRepo: Repository<Skill>,
    @InjectRepository(city) private CityRepository: Repository<city>,
  ) {}
  async createJobPost(createJobPostDto: CreateJobPostDto, userId: number) {
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

    const user = await this.userService.findOne(userId);
    if (!user) throw new NotFoundException("There's no user with that ID!");

    const company = await this.companyrepo.findOne({
      where: { id: createJobPostDto.companyId, owner: { id: userId } },
    });
    if (!company)
      throw new NotFoundException(
        'You are not allowed to create a job post for this company!',
      );

    const supervisor = await this.userService.findOne(
      createJobPostDto.superVisorId,
    );
    if (!supervisor)
      throw new NotFoundException("There's no supervisor with that ID!");

    const location = await this.CityRepository.findOne({
      where: { id: createJobPostDto.location },
    });
    if (!location)
      throw new NotFoundException("There's no location with that id!");

    const companyEmployer = await this.workExperienceRepo.findOne({
      where: {
        company: { id: company.id },
        employer: { id: supervisor.id },
        endDate: null,
      },
    });
    if (!companyEmployer)
      throw new NotFoundException(
        "There's no supervisor that currently works in the company!",
      );

    const jobPost = this.jobPost.create({
      ...createJobPostDto,
      supervisor,
      company,
      deadLine,
      skills,
      location,
    });

    const savedJobPost = await this.jobPost.save(jobPost);

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
  async getJobPosts() {
    const jobPosts = await this.jobPost.find();
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
      relations: ['skills', 'company', 'supervisor'],
    });
    if (!jobPostObject)
      throw new NotFoundException("there's no jobPost Found!");
    const user = await this.userService.findOne(userId);
    if (!user)
      throw new NotFoundException('User doesnt exist please login again!');
    if (jobPostObject.company.owner.id !== user.id)
      throw new ForbiddenException(
        'You are not allowed to update jobPost without logging in as an owner!',
      );
    let deadLine: Date | undefined;
    if (updateJobPostDto.deadLine) {
      deadLine = new Date(updateJobPostDto.deadLine);
      if (deadLine <= new Date())
        throw new ForbiddenException('You are entering an invalid Deadline!');
      jobPostObject.deadLine = updateJobPostDto.deadLine;
    }
    let supervisor;
    if (updateJobPostDto.superVisorId) {
      supervisor = this.userService.findOne(updateJobPostDto.superVisorId);
      if (!supervisor)
        throw new NotFoundException("there's no user with that id!");
      jobPostObject.supervisor = supervisor;
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
    if (skills.length) {
      jobPostObject.skills = skills;
    }
    if (supervisor) {
      jobPostObject.supervisor = supervisor;
    }
    if (updateJobPostDto.workplace) {
      jobPostObject.workPlace = updateJobPostDto.workplace;
    }
    if (updateJobPostDto.location) {
      jobPostObject.location = await this.CityRepository.findOne({
        where: { id: updateJobPostDto.location },
      });
    }
    jobPostObject = await this.jobPost.save(jobPostObject);
    return {
      status: 'success',
      jobPostObject,
    };
  }
  async deleteJobPost(id: number, userId: number) {
    const jobPost = await this.jobPost.findOne({ where: { id } });
    if (!jobPost) throw new NotFoundException("there's no jobPost found!");
    const user = await this.userService.findOne(userId);
    if (!user) throw new NotFoundException("There's no user found!");
    if (
      jobPost.company.owner.id !== user.id ||
      jobPost.supervisor.id !== user.id
    )
      throw new ForbiddenException(
        'You are not allowed to delete jobPost without being owner or supervisor!',
      );
    await this.jobPost.remove(jobPost);
    return {
      status: 'success',
    };
  }
}
