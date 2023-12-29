// import { Test, TestingModule } from '@nestjs/testing';
// import { UsersController } from './users.controller';
// import { UsersService } from './users.service';
// import { User } from './user.entity';


// describe('UsersController', () => {
//   let controller: UsersController;
//   let fakeUsersService: Partial<UsersService>;
//   let fakeAuthService:Partial<AuthService>;


//   beforeEach(async () => {
//     fakeAuthService={
//       signup:(email:string,password)=>{
//         return Promise.resolve({id:1,email,password} as User)
//       },
//       signin:(email:string,password:string)=>{
//         return Promise.resolve({id:1,email,password} as User)
//       }
//     }
//     fakeUsersService={
//       findOne:(id:number)=>{return Promise.resolve({id:id,email:'heki@gmail.com',password:'hekurankokolli123'} as User)},
//       find:(email:string)=>{return Promise.resolve([{id:Math.random()*999,email:email,password:'hisahdia'}as User])},
      
//     };
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [UsersController],
//       providers:[
//         {
// provide:UsersService,
// useValue:fakeUsersService
//         },
//         {
// provide:AuthService,
// useValue:fakeAuthService
//         }
//       ]
//     }).compile();

//     controller = module.get<UsersController>(UsersController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
//   it('find all users',async ()=>{
// const user=await controller.findAllUsers('hahaha@gmail.com')
// expect(user.length).toEqual(1);
// expect(user[0].email).toEqual('hahaha@gmail.com')
//   })
//   it('Find User',async ()=>{
//     const user=await controller.findUser('1');
//     expect(user).toBeDefined()
//   })
//   it('find User that throws an error if an user with given id doesnt exists', async ()=>{
//     try{
//     await fakeUsersService.findOne(123);
//     }catch(err){
//       throw new Error(err.message)
//     }
//   })
//   it('signin updates session object and returns a user', async ()=>{


//   })
  
// });
