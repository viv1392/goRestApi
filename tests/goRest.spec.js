const{ test,SLA }=require('../fixture/FixtureTest');
const{expect}=require('@playwright/test');
const{SchemaVladation}=require('../utils/schemaValidator');
const{getUserSchema,schemaCreateUser}=require('../schema/Schema');
const{payLoad}=require('../utils/testData');
const schemaVladation=new SchemaVladation();

test.describe.serial('Gorest APi tests',()=>{
    let userId=''

    test('Get user details',async({userApi})=>{ 
        const startTime = Date.now();
        const response=await userApi.getUserDetails() 
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        console.log(`Response time: ${responseTime} ms`);
        expect(responseTime).toBeLessThan(SLA.responeTime); // SLA for response time
        expect(response.status()).toBe(SLA.Get);
        const responseBody=await response.json();
        console.log(responseBody);
        expect(responseBody.length).toBe(2);
        expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')
        expect(responseBody[0]).toHaveProperty('id')
        expect(responseBody[0]).toHaveProperty('name')
        expect(responseBody[0]).toHaveProperty('gender')
        expect(responseBody[0]).toHaveProperty('email')
        expect(responseBody[0]).toHaveProperty('status')
        expect(Array.isArray(responseBody)).toBeTruthy();
        schemaVladation.validateSchema(getUserSchema,responseBody);
   })
   test('Create user',async({userApi})=>{
    const response=await userApi.createUser(payLoad)
    expect(response.status()).toBe(SLA.Post);
    const responseBody=await response.json();
    userId=responseBody.id;
    console.log(responseBody);
    expect(responseBody).toHaveProperty('id')
    expect(responseBody).toHaveProperty('name',payLoad.name)
    expect(responseBody).toHaveProperty('email',payLoad.email)
    expect(responseBody).toHaveProperty('status',payLoad.status)
    schemaVladation.validateSchema(schemaCreateUser,responseBody);
   })
   test('Get usser by ID',async({userApi})=>{
    if(!userId==''){
    const createResponse=await userApi.getUserById(userId)
    expect(createResponse.status()).toBe(SLA.Get);
    const responseBody=await createResponse.json();
    console.log(responseBody);
    expect(responseBody).toHaveProperty('id',userId)
    expect(responseBody).toHaveProperty('name')
    expect(responseBody).toHaveProperty('email')
    expect(responseBody).toHaveProperty('gender')
    expect(responseBody).toHaveProperty('status')       
    schemaVladation.validateSchema(schemaCreateUser,responseBody);
   }
})
test('update user by Id',async({userApi})=>{
    if(!userId==''){
        const updateResponse=await userApi.updateUser(userId,{
            ...payLoad,
            name:'Reema'
          })
            expect(updateResponse.status()).toBe(SLA.Put);
            const responseBody=await updateResponse.json();
            console.log('Upadted body',responseBody);
            expect(responseBody).toHaveProperty('id',userId)
            expect(responseBody).toHaveProperty('name','Reema')
            expect(responseBody).toHaveProperty('email',payLoad.email)
            schemaVladation.validateSchema(schemaCreateUser,responseBody) 
            
    }
  })
    
})