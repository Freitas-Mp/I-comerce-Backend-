import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave} from '@ioc:Adonis/Lucid/Orm'
import  Hash from '@ioc:Adonis/Core/Hash'

export default class User extends BaseModel {
  @column({isPrimary:true})
  public id: string

   @column()
    public username:string
   @column()
   public password:string
   @column()
   public remember_me?:string
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
