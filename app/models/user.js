import Model, { attr } from '@ember-data/model';

export default class UserModel extends Model {
  @attr('string') email;
  @attr('string') role;

  @attr('number') emailChangeConfirmStatus;

  @attr('date') confirmationSentAt;
  @attr('date') confirmedAt;
  @attr('date') lastSignInAt;
  @attr('date') recoverySentAt;
  @attr('date') invitedAt;
  @attr('date') createdAt;
  @attr('date') updatedAt;

  // app_metadata: {provider: "email"}

}
