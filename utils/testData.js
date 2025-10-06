import { faker, Faker } from "@faker-js/faker";
const payLoad=                                                                                                                                          
                  {  
                        name: faker.person.firstName(),
                        email: faker.internet.email(),
                        gender: faker.person.sex(),
                        status: 'active'
                    }
                    
module.exports={payLoad};