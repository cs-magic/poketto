import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValue: z.ZodType<Prisma.JsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(JsonValue)),
  z.lazy(() => z.record(JsonValue)),
]);

export type JsonValueType = z.infer<typeof JsonValue>;

export const NullableJsonValue = z
  .union([JsonValue, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValue: z.ZodType<Prisma.InputJsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(InputJsonValue.nullable())),
  z.lazy(() => z.record(InputJsonValue.nullable())),
]);

export type InputJsonValueType = z.infer<typeof InputJsonValue>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const AccountScalarFieldEnumSchema = z.enum(['id','userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state','refresh_token_expires_in']);

export const AppScalarFieldEnumSchema = z.enum(['id','platformType','platformId','createdAt','updatedAt','creatorId','name','avatar','desc','language','version','categoryMain','categorySub','modelName','isOpenSource','modelArgs']);

export const AppActionScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','userId','appId','action']);

export const AppCategoryScalarFieldEnumSchema = z.enum(['createdAt','updatedAt','main','sub']);

export const AppCommentScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','userId','appId','title','content','rate']);

export const AppStateScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','views','stars','forks','tips','calls','shares','appId']);

export const AppTagScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','creatorId','name']);

export const ChatMessageScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','userId','role','content','format','conversationId','shortId','namespace']);

export const ChatMessageActionScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','userId','messageId','action']);

export const ConversationScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','isActive','userId','appId','pinned']);

export const FollowRelationScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','fromId','toId']);

export const InvitationRelationScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','status','fromId','toId']);

export const SessionScalarFieldEnumSchema = z.enum(['id','sessionToken','userId','expires']);

export const StarringAppScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','appId','isActive','userId']);

export const TranscationScalarFieldEnumSchema = z.enum(['id','userId']);

export const UserScalarFieldEnumSchema = z.enum(['id','platformType','platformId','platformArgs','name','email','emailVerified','image','description','balance','followedByCount','followingCount']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier','token','expires']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullableJsonNullValueInputSchema = z.enum(['DbNull','JsonNull',]).transform((v) => transformJsonNull(v));

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]);

export const ChatMessageFormatTypeSchema = z.enum(['text','image','voice','video','map','realtimeVoice','realtimeVideo','systemNotification']);

export type ChatMessageFormatTypeType = `${z.infer<typeof ChatMessageFormatTypeSchema>}`

export const InvitationStatusSchema = z.enum(['Idle','Pending','Accepted','Expired']);

export type InvitationStatusType = `${z.infer<typeof InvitationStatusSchema>}`

export const PlatformTypeSchema = z.enum(['Poketto','FlowGPT','OpenAI','MidJourney','StableDiffusion','OpenChat','Github','Discord']);

export type PlatformTypeType = `${z.infer<typeof PlatformTypeSchema>}`

export const PromptRoleTypeSchema = z.enum(['system','user','assistant','function']);

export type PromptRoleTypeType = `${z.infer<typeof PromptRoleTypeSchema>}`

export const RoleTypeSchema = z.enum(['admin','manager','normal']);

export type RoleTypeType = `${z.infer<typeof RoleTypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().int().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
  refresh_token_expires_in: z.number().int().nullable(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// APP SCHEMA
/////////////////////////////////////////

export const AppSchema = z.object({
  platformType: PlatformTypeSchema,
  id: z.string(),
  platformId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  creatorId: z.string(),
  name: z.string(),
  avatar: z.string(),
  desc: z.string(),
  language: z.string(),
  version: z.string(),
  categoryMain: z.number().int(),
  categorySub: z.number().int(),
  modelName: z.string(),
  isOpenSource: z.boolean(),
  /**
   * [ModelArgs]
   */
  modelArgs: NullableJsonValue.optional(),
})

export type App = z.infer<typeof AppSchema>

/////////////////////////////////////////
// APP ACTION SCHEMA
/////////////////////////////////////////

export const AppActionSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date().nullable(),
  updatedAt: z.coerce.date().nullable(),
  userId: z.string().nullable(),
  appId: z.string(),
  action: z.string(),
})

export type AppAction = z.infer<typeof AppActionSchema>

/////////////////////////////////////////
// APP CATEGORY SCHEMA
/////////////////////////////////////////

export const AppCategorySchema = z.object({
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  main: z.number().int(),
  sub: z.number().int(),
})

export type AppCategory = z.infer<typeof AppCategorySchema>

/////////////////////////////////////////
// APP COMMENT SCHEMA
/////////////////////////////////////////

export const AppCommentSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
  appId: z.string(),
  title: z.string().nullable(),
  content: z.string(),
  rate: z.number().int().nullable(),
})

export type AppComment = z.infer<typeof AppCommentSchema>

/////////////////////////////////////////
// APP STATE SCHEMA
/////////////////////////////////////////

export const AppStateSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date().nullable(),
  updatedAt: z.coerce.date().nullable(),
  views: z.number().int(),
  stars: z.number().int(),
  forks: z.number().int(),
  tips: z.number(),
  calls: z.number().int(),
  shares: z.number().int(),
  appId: z.string(),
})

export type AppState = z.infer<typeof AppStateSchema>

/////////////////////////////////////////
// APP TAG SCHEMA
/////////////////////////////////////////

export const AppTagSchema = z.object({
  id: z.string().cuid(),
  /**
   * 这几个主要是 flowgpt 没有
   */
  createdAt: z.coerce.date().nullable(),
  updatedAt: z.coerce.date().nullable(),
  creatorId: z.string().nullable(),
  name: z.string(),
})

export type AppTag = z.infer<typeof AppTagSchema>

/////////////////////////////////////////
// CHAT MESSAGE SCHEMA
/////////////////////////////////////////

export const ChatMessageSchema = z.object({
  role: PromptRoleTypeSchema,
  format: ChatMessageFormatTypeSchema,
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string().nullable(),
  content: z.string(),
  conversationId: z.string(),
  shortId: z.string(),
  namespace: z.string().nullable(),
})

export type ChatMessage = z.infer<typeof ChatMessageSchema>

/////////////////////////////////////////
// CHAT MESSAGE ACTION SCHEMA
/////////////////////////////////////////

export const ChatMessageActionSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
  messageId: z.string(),
  action: z.string(),
})

export type ChatMessageAction = z.infer<typeof ChatMessageActionSchema>

/////////////////////////////////////////
// CONVERSATION SCHEMA
/////////////////////////////////////////

export const ConversationSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  isActive: z.boolean(),
  userId: z.string(),
  appId: z.string(),
  pinned: z.boolean(),
})

export type Conversation = z.infer<typeof ConversationSchema>

/////////////////////////////////////////
// FOLLOW RELATION SCHEMA
/////////////////////////////////////////

export const FollowRelationSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  fromId: z.string(),
  toId: z.string(),
})

export type FollowRelation = z.infer<typeof FollowRelationSchema>

/////////////////////////////////////////
// INVITATION RELATION SCHEMA
/////////////////////////////////////////

export const InvitationRelationSchema = z.object({
  status: InvitationStatusSchema,
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  fromId: z.string(),
  toId: z.string().nullable(),
})

export type InvitationRelation = z.infer<typeof InvitationRelationSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string().cuid(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// STARRING APP SCHEMA
/////////////////////////////////////////

export const StarringAppSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  appId: z.string(),
  isActive: z.boolean(),
  userId: z.string(),
})

export type StarringApp = z.infer<typeof StarringAppSchema>

/////////////////////////////////////////
// TRANSCATION SCHEMA
/////////////////////////////////////////

export const TranscationSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
})

export type Transcation = z.infer<typeof TranscationSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  platformType: PlatformTypeSchema,
  id: z.string(),
  platformId: z.string(),
  /**
   * [PlatformArgs]
   */
  platformArgs: NullableJsonValue.optional(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  emailVerified: z.coerce.date().nullable(),
  image: z.string().nullable(),
  description: z.string().nullable(),
  balance: z.number().int(),
  /**
   * note: 这里显式声明计数字段，是为了提高性能，以及 prisma 对 computed field 的 type support 还处于开始阶段
   * 我们为了对象的数据切片，故分开
   */
  followedByCount: z.number().int(),
  followingCount: z.number().int(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  type: z.boolean().optional(),
  provider: z.boolean().optional(),
  providerAccountId: z.boolean().optional(),
  refresh_token: z.boolean().optional(),
  access_token: z.boolean().optional(),
  expires_at: z.boolean().optional(),
  token_type: z.boolean().optional(),
  scope: z.boolean().optional(),
  id_token: z.boolean().optional(),
  session_state: z.boolean().optional(),
  refresh_token_expires_in: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// APP
//------------------------------------------------------

export const AppIncludeSchema: z.ZodType<Prisma.AppInclude> = z.object({
  creator: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => AppTagFindManyArgsSchema)]).optional(),
  category: z.union([z.boolean(),z.lazy(() => AppCategoryArgsSchema)]).optional(),
  actions: z.union([z.boolean(),z.lazy(() => AppActionFindManyArgsSchema)]).optional(),
  using: z.union([z.boolean(),z.lazy(() => ConversationFindManyArgsSchema)]).optional(),
  starring: z.union([z.boolean(),z.lazy(() => StarringAppFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => AppCommentFindManyArgsSchema)]).optional(),
  state: z.union([z.boolean(),z.lazy(() => AppStateArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AppCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const AppArgsSchema: z.ZodType<Prisma.AppDefaultArgs> = z.object({
  select: z.lazy(() => AppSelectSchema).optional(),
  include: z.lazy(() => AppIncludeSchema).optional(),
}).strict();

export const AppCountOutputTypeArgsSchema: z.ZodType<Prisma.AppCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => AppCountOutputTypeSelectSchema).nullish(),
}).strict();

export const AppCountOutputTypeSelectSchema: z.ZodType<Prisma.AppCountOutputTypeSelect> = z.object({
  tags: z.boolean().optional(),
  actions: z.boolean().optional(),
  using: z.boolean().optional(),
  starring: z.boolean().optional(),
  comments: z.boolean().optional(),
}).strict();

export const AppSelectSchema: z.ZodType<Prisma.AppSelect> = z.object({
  id: z.boolean().optional(),
  platformType: z.boolean().optional(),
  platformId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  creatorId: z.boolean().optional(),
  name: z.boolean().optional(),
  avatar: z.boolean().optional(),
  desc: z.boolean().optional(),
  language: z.boolean().optional(),
  version: z.boolean().optional(),
  categoryMain: z.boolean().optional(),
  categorySub: z.boolean().optional(),
  modelName: z.boolean().optional(),
  isOpenSource: z.boolean().optional(),
  modelArgs: z.boolean().optional(),
  creator: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => AppTagFindManyArgsSchema)]).optional(),
  category: z.union([z.boolean(),z.lazy(() => AppCategoryArgsSchema)]).optional(),
  actions: z.union([z.boolean(),z.lazy(() => AppActionFindManyArgsSchema)]).optional(),
  using: z.union([z.boolean(),z.lazy(() => ConversationFindManyArgsSchema)]).optional(),
  starring: z.union([z.boolean(),z.lazy(() => StarringAppFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => AppCommentFindManyArgsSchema)]).optional(),
  state: z.union([z.boolean(),z.lazy(() => AppStateArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AppCountOutputTypeArgsSchema)]).optional(),
}).strict()

// APP ACTION
//------------------------------------------------------

export const AppActionIncludeSchema: z.ZodType<Prisma.AppActionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  app: z.union([z.boolean(),z.lazy(() => AppArgsSchema)]).optional(),
}).strict()

export const AppActionArgsSchema: z.ZodType<Prisma.AppActionDefaultArgs> = z.object({
  select: z.lazy(() => AppActionSelectSchema).optional(),
  include: z.lazy(() => AppActionIncludeSchema).optional(),
}).strict();

export const AppActionSelectSchema: z.ZodType<Prisma.AppActionSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  appId: z.boolean().optional(),
  action: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  app: z.union([z.boolean(),z.lazy(() => AppArgsSchema)]).optional(),
}).strict()

// APP CATEGORY
//------------------------------------------------------

export const AppCategoryIncludeSchema: z.ZodType<Prisma.AppCategoryInclude> = z.object({
  App: z.union([z.boolean(),z.lazy(() => AppFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AppCategoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const AppCategoryArgsSchema: z.ZodType<Prisma.AppCategoryDefaultArgs> = z.object({
  select: z.lazy(() => AppCategorySelectSchema).optional(),
  include: z.lazy(() => AppCategoryIncludeSchema).optional(),
}).strict();

export const AppCategoryCountOutputTypeArgsSchema: z.ZodType<Prisma.AppCategoryCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => AppCategoryCountOutputTypeSelectSchema).nullish(),
}).strict();

export const AppCategoryCountOutputTypeSelectSchema: z.ZodType<Prisma.AppCategoryCountOutputTypeSelect> = z.object({
  App: z.boolean().optional(),
}).strict();

export const AppCategorySelectSchema: z.ZodType<Prisma.AppCategorySelect> = z.object({
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  main: z.boolean().optional(),
  sub: z.boolean().optional(),
  App: z.union([z.boolean(),z.lazy(() => AppFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AppCategoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

// APP COMMENT
//------------------------------------------------------

export const AppCommentIncludeSchema: z.ZodType<Prisma.AppCommentInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  aApp: z.union([z.boolean(),z.lazy(() => AppArgsSchema)]).optional(),
}).strict()

export const AppCommentArgsSchema: z.ZodType<Prisma.AppCommentDefaultArgs> = z.object({
  select: z.lazy(() => AppCommentSelectSchema).optional(),
  include: z.lazy(() => AppCommentIncludeSchema).optional(),
}).strict();

export const AppCommentSelectSchema: z.ZodType<Prisma.AppCommentSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  appId: z.boolean().optional(),
  title: z.boolean().optional(),
  content: z.boolean().optional(),
  rate: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  aApp: z.union([z.boolean(),z.lazy(() => AppArgsSchema)]).optional(),
}).strict()

// APP STATE
//------------------------------------------------------

export const AppStateIncludeSchema: z.ZodType<Prisma.AppStateInclude> = z.object({
  app: z.union([z.boolean(),z.lazy(() => AppArgsSchema)]).optional(),
}).strict()

export const AppStateArgsSchema: z.ZodType<Prisma.AppStateDefaultArgs> = z.object({
  select: z.lazy(() => AppStateSelectSchema).optional(),
  include: z.lazy(() => AppStateIncludeSchema).optional(),
}).strict();

export const AppStateSelectSchema: z.ZodType<Prisma.AppStateSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  views: z.boolean().optional(),
  stars: z.boolean().optional(),
  forks: z.boolean().optional(),
  tips: z.boolean().optional(),
  calls: z.boolean().optional(),
  shares: z.boolean().optional(),
  appId: z.boolean().optional(),
  app: z.union([z.boolean(),z.lazy(() => AppArgsSchema)]).optional(),
}).strict()

// APP TAG
//------------------------------------------------------

export const AppTagIncludeSchema: z.ZodType<Prisma.AppTagInclude> = z.object({
  creator: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  apps: z.union([z.boolean(),z.lazy(() => AppFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AppTagCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const AppTagArgsSchema: z.ZodType<Prisma.AppTagDefaultArgs> = z.object({
  select: z.lazy(() => AppTagSelectSchema).optional(),
  include: z.lazy(() => AppTagIncludeSchema).optional(),
}).strict();

export const AppTagCountOutputTypeArgsSchema: z.ZodType<Prisma.AppTagCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => AppTagCountOutputTypeSelectSchema).nullish(),
}).strict();

export const AppTagCountOutputTypeSelectSchema: z.ZodType<Prisma.AppTagCountOutputTypeSelect> = z.object({
  apps: z.boolean().optional(),
}).strict();

export const AppTagSelectSchema: z.ZodType<Prisma.AppTagSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  creatorId: z.boolean().optional(),
  name: z.boolean().optional(),
  creator: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  apps: z.union([z.boolean(),z.lazy(() => AppFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AppTagCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CHAT MESSAGE
//------------------------------------------------------

export const ChatMessageIncludeSchema: z.ZodType<Prisma.ChatMessageInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  userActionOnMessage: z.union([z.boolean(),z.lazy(() => ChatMessageActionFindManyArgsSchema)]).optional(),
  conversation: z.union([z.boolean(),z.lazy(() => ConversationArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ChatMessageCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ChatMessageArgsSchema: z.ZodType<Prisma.ChatMessageDefaultArgs> = z.object({
  select: z.lazy(() => ChatMessageSelectSchema).optional(),
  include: z.lazy(() => ChatMessageIncludeSchema).optional(),
}).strict();

export const ChatMessageCountOutputTypeArgsSchema: z.ZodType<Prisma.ChatMessageCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ChatMessageCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ChatMessageCountOutputTypeSelectSchema: z.ZodType<Prisma.ChatMessageCountOutputTypeSelect> = z.object({
  userActionOnMessage: z.boolean().optional(),
}).strict();

export const ChatMessageSelectSchema: z.ZodType<Prisma.ChatMessageSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  role: z.boolean().optional(),
  content: z.boolean().optional(),
  format: z.boolean().optional(),
  conversationId: z.boolean().optional(),
  shortId: z.boolean().optional(),
  namespace: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  userActionOnMessage: z.union([z.boolean(),z.lazy(() => ChatMessageActionFindManyArgsSchema)]).optional(),
  conversation: z.union([z.boolean(),z.lazy(() => ConversationArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ChatMessageCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CHAT MESSAGE ACTION
//------------------------------------------------------

export const ChatMessageActionIncludeSchema: z.ZodType<Prisma.ChatMessageActionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  message: z.union([z.boolean(),z.lazy(() => ChatMessageArgsSchema)]).optional(),
}).strict()

export const ChatMessageActionArgsSchema: z.ZodType<Prisma.ChatMessageActionDefaultArgs> = z.object({
  select: z.lazy(() => ChatMessageActionSelectSchema).optional(),
  include: z.lazy(() => ChatMessageActionIncludeSchema).optional(),
}).strict();

export const ChatMessageActionSelectSchema: z.ZodType<Prisma.ChatMessageActionSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  messageId: z.boolean().optional(),
  action: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  message: z.union([z.boolean(),z.lazy(() => ChatMessageArgsSchema)]).optional(),
}).strict()

// CONVERSATION
//------------------------------------------------------

export const ConversationIncludeSchema: z.ZodType<Prisma.ConversationInclude> = z.object({
  messages: z.union([z.boolean(),z.lazy(() => ChatMessageFindManyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  app: z.union([z.boolean(),z.lazy(() => AppArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ConversationCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ConversationArgsSchema: z.ZodType<Prisma.ConversationDefaultArgs> = z.object({
  select: z.lazy(() => ConversationSelectSchema).optional(),
  include: z.lazy(() => ConversationIncludeSchema).optional(),
}).strict();

export const ConversationCountOutputTypeArgsSchema: z.ZodType<Prisma.ConversationCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ConversationCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ConversationCountOutputTypeSelectSchema: z.ZodType<Prisma.ConversationCountOutputTypeSelect> = z.object({
  messages: z.boolean().optional(),
}).strict();

export const ConversationSelectSchema: z.ZodType<Prisma.ConversationSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  isActive: z.boolean().optional(),
  userId: z.boolean().optional(),
  appId: z.boolean().optional(),
  pinned: z.boolean().optional(),
  messages: z.union([z.boolean(),z.lazy(() => ChatMessageFindManyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  app: z.union([z.boolean(),z.lazy(() => AppArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ConversationCountOutputTypeArgsSchema)]).optional(),
}).strict()

// FOLLOW RELATION
//------------------------------------------------------

export const FollowRelationIncludeSchema: z.ZodType<Prisma.FollowRelationInclude> = z.object({
  from: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  to: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const FollowRelationArgsSchema: z.ZodType<Prisma.FollowRelationDefaultArgs> = z.object({
  select: z.lazy(() => FollowRelationSelectSchema).optional(),
  include: z.lazy(() => FollowRelationIncludeSchema).optional(),
}).strict();

export const FollowRelationSelectSchema: z.ZodType<Prisma.FollowRelationSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  fromId: z.boolean().optional(),
  toId: z.boolean().optional(),
  from: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  to: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// INVITATION RELATION
//------------------------------------------------------

export const InvitationRelationIncludeSchema: z.ZodType<Prisma.InvitationRelationInclude> = z.object({
  from: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  to: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const InvitationRelationArgsSchema: z.ZodType<Prisma.InvitationRelationDefaultArgs> = z.object({
  select: z.lazy(() => InvitationRelationSelectSchema).optional(),
  include: z.lazy(() => InvitationRelationIncludeSchema).optional(),
}).strict();

export const InvitationRelationSelectSchema: z.ZodType<Prisma.InvitationRelationSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  status: z.boolean().optional(),
  fromId: z.boolean().optional(),
  toId: z.boolean().optional(),
  from: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  to: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  sessionToken: z.boolean().optional(),
  userId: z.boolean().optional(),
  expires: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// STARRING APP
//------------------------------------------------------

export const StarringAppIncludeSchema: z.ZodType<Prisma.StarringAppInclude> = z.object({
  app: z.union([z.boolean(),z.lazy(() => AppArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const StarringAppArgsSchema: z.ZodType<Prisma.StarringAppDefaultArgs> = z.object({
  select: z.lazy(() => StarringAppSelectSchema).optional(),
  include: z.lazy(() => StarringAppIncludeSchema).optional(),
}).strict();

export const StarringAppSelectSchema: z.ZodType<Prisma.StarringAppSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  appId: z.boolean().optional(),
  isActive: z.boolean().optional(),
  userId: z.boolean().optional(),
  app: z.union([z.boolean(),z.lazy(() => AppArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// TRANSCATION
//------------------------------------------------------

export const TranscationIncludeSchema: z.ZodType<Prisma.TranscationInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const TranscationArgsSchema: z.ZodType<Prisma.TranscationDefaultArgs> = z.object({
  select: z.lazy(() => TranscationSelectSchema).optional(),
  include: z.lazy(() => TranscationIncludeSchema).optional(),
}).strict();

export const TranscationSelectSchema: z.ZodType<Prisma.TranscationSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  invitedFrom: z.union([z.boolean(),z.lazy(() => InvitationRelationFindManyArgsSchema)]).optional(),
  invitedTo: z.union([z.boolean(),z.lazy(() => InvitationRelationFindManyArgsSchema)]).optional(),
  followedBy: z.union([z.boolean(),z.lazy(() => FollowRelationFindManyArgsSchema)]).optional(),
  following: z.union([z.boolean(),z.lazy(() => FollowRelationFindManyArgsSchema)]).optional(),
  chatMessages: z.union([z.boolean(),z.lazy(() => ChatMessageFindManyArgsSchema)]).optional(),
  chatMessageActions: z.union([z.boolean(),z.lazy(() => ChatMessageActionFindManyArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => AppTagFindManyArgsSchema)]).optional(),
  appComments: z.union([z.boolean(),z.lazy(() => AppCommentFindManyArgsSchema)]).optional(),
  appActions: z.union([z.boolean(),z.lazy(() => AppActionFindManyArgsSchema)]).optional(),
  StarringApp: z.union([z.boolean(),z.lazy(() => StarringAppFindManyArgsSchema)]).optional(),
  createdApps: z.union([z.boolean(),z.lazy(() => AppFindManyArgsSchema)]).optional(),
  conversations: z.union([z.boolean(),z.lazy(() => ConversationFindManyArgsSchema)]).optional(),
  Transcation: z.union([z.boolean(),z.lazy(() => TranscationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  accounts: z.boolean().optional(),
  sessions: z.boolean().optional(),
  invitedFrom: z.boolean().optional(),
  invitedTo: z.boolean().optional(),
  followedBy: z.boolean().optional(),
  following: z.boolean().optional(),
  chatMessages: z.boolean().optional(),
  chatMessageActions: z.boolean().optional(),
  tags: z.boolean().optional(),
  appComments: z.boolean().optional(),
  appActions: z.boolean().optional(),
  StarringApp: z.boolean().optional(),
  createdApps: z.boolean().optional(),
  conversations: z.boolean().optional(),
  Transcation: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  platformType: z.boolean().optional(),
  platformId: z.boolean().optional(),
  platformArgs: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  image: z.boolean().optional(),
  description: z.boolean().optional(),
  balance: z.boolean().optional(),
  followedByCount: z.boolean().optional(),
  followingCount: z.boolean().optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  invitedFrom: z.union([z.boolean(),z.lazy(() => InvitationRelationFindManyArgsSchema)]).optional(),
  invitedTo: z.union([z.boolean(),z.lazy(() => InvitationRelationFindManyArgsSchema)]).optional(),
  followedBy: z.union([z.boolean(),z.lazy(() => FollowRelationFindManyArgsSchema)]).optional(),
  following: z.union([z.boolean(),z.lazy(() => FollowRelationFindManyArgsSchema)]).optional(),
  chatMessages: z.union([z.boolean(),z.lazy(() => ChatMessageFindManyArgsSchema)]).optional(),
  chatMessageActions: z.union([z.boolean(),z.lazy(() => ChatMessageActionFindManyArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => AppTagFindManyArgsSchema)]).optional(),
  appComments: z.union([z.boolean(),z.lazy(() => AppCommentFindManyArgsSchema)]).optional(),
  appActions: z.union([z.boolean(),z.lazy(() => AppActionFindManyArgsSchema)]).optional(),
  StarringApp: z.union([z.boolean(),z.lazy(() => StarringAppFindManyArgsSchema)]).optional(),
  createdApps: z.union([z.boolean(),z.lazy(() => AppFindManyArgsSchema)]).optional(),
  conversations: z.union([z.boolean(),z.lazy(() => ConversationFindManyArgsSchema)]).optional(),
  Transcation: z.union([z.boolean(),z.lazy(() => TranscationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> = z.object({
  identifier: z.boolean().optional(),
  token: z.boolean().optional(),
  expires: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  refresh_token_expires_in: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  refresh_token_expires_in: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  refresh_token_expires_in: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  refresh_token_expires_in: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional()
}).strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  refresh_token_expires_in: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const AppWhereInputSchema: z.ZodType<Prisma.AppWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AppWhereInputSchema),z.lazy(() => AppWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppWhereInputSchema),z.lazy(() => AppWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  platformType: z.union([ z.lazy(() => EnumPlatformTypeFilterSchema),z.lazy(() => PlatformTypeSchema) ]).optional(),
  platformId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  creatorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  avatar: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  desc: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  language: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  version: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  categoryMain: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  categorySub: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  modelName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isOpenSource: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  modelArgs: z.lazy(() => JsonNullableFilterSchema).optional(),
  creator: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  tags: z.lazy(() => AppTagListRelationFilterSchema).optional(),
  category: z.union([ z.lazy(() => AppCategoryRelationFilterSchema),z.lazy(() => AppCategoryWhereInputSchema) ]).optional(),
  actions: z.lazy(() => AppActionListRelationFilterSchema).optional(),
  using: z.lazy(() => ConversationListRelationFilterSchema).optional(),
  starring: z.lazy(() => StarringAppListRelationFilterSchema).optional(),
  comments: z.lazy(() => AppCommentListRelationFilterSchema).optional(),
  state: z.union([ z.lazy(() => AppStateNullableRelationFilterSchema),z.lazy(() => AppStateWhereInputSchema) ]).optional().nullable(),
}).strict();

export const AppOrderByWithRelationInputSchema: z.ZodType<Prisma.AppOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  platformType: z.lazy(() => SortOrderSchema).optional(),
  platformId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  creatorId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  desc: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  categoryMain: z.lazy(() => SortOrderSchema).optional(),
  categorySub: z.lazy(() => SortOrderSchema).optional(),
  modelName: z.lazy(() => SortOrderSchema).optional(),
  isOpenSource: z.lazy(() => SortOrderSchema).optional(),
  modelArgs: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  creator: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  tags: z.lazy(() => AppTagOrderByRelationAggregateInputSchema).optional(),
  category: z.lazy(() => AppCategoryOrderByWithRelationInputSchema).optional(),
  actions: z.lazy(() => AppActionOrderByRelationAggregateInputSchema).optional(),
  using: z.lazy(() => ConversationOrderByRelationAggregateInputSchema).optional(),
  starring: z.lazy(() => StarringAppOrderByRelationAggregateInputSchema).optional(),
  comments: z.lazy(() => AppCommentOrderByRelationAggregateInputSchema).optional(),
  state: z.lazy(() => AppStateOrderByWithRelationInputSchema).optional()
}).strict();

export const AppWhereUniqueInputSchema: z.ZodType<Prisma.AppWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    platform: z.lazy(() => AppPlatformCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    platform: z.lazy(() => AppPlatformCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().optional(),
  platform: z.lazy(() => AppPlatformCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => AppWhereInputSchema),z.lazy(() => AppWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppWhereInputSchema),z.lazy(() => AppWhereInputSchema).array() ]).optional(),
  platformType: z.union([ z.lazy(() => EnumPlatformTypeFilterSchema),z.lazy(() => PlatformTypeSchema) ]).optional(),
  platformId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  creatorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  avatar: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  desc: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  language: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  version: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  categoryMain: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  categorySub: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  modelName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isOpenSource: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  modelArgs: z.lazy(() => JsonNullableFilterSchema).optional(),
  creator: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  tags: z.lazy(() => AppTagListRelationFilterSchema).optional(),
  category: z.union([ z.lazy(() => AppCategoryRelationFilterSchema),z.lazy(() => AppCategoryWhereInputSchema) ]).optional(),
  actions: z.lazy(() => AppActionListRelationFilterSchema).optional(),
  using: z.lazy(() => ConversationListRelationFilterSchema).optional(),
  starring: z.lazy(() => StarringAppListRelationFilterSchema).optional(),
  comments: z.lazy(() => AppCommentListRelationFilterSchema).optional(),
  state: z.union([ z.lazy(() => AppStateNullableRelationFilterSchema),z.lazy(() => AppStateWhereInputSchema) ]).optional().nullable(),
}).strict());

export const AppOrderByWithAggregationInputSchema: z.ZodType<Prisma.AppOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  platformType: z.lazy(() => SortOrderSchema).optional(),
  platformId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  creatorId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  desc: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  categoryMain: z.lazy(() => SortOrderSchema).optional(),
  categorySub: z.lazy(() => SortOrderSchema).optional(),
  modelName: z.lazy(() => SortOrderSchema).optional(),
  isOpenSource: z.lazy(() => SortOrderSchema).optional(),
  modelArgs: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => AppCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AppAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AppMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AppMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AppSumOrderByAggregateInputSchema).optional()
}).strict();

export const AppScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AppScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AppScalarWhereWithAggregatesInputSchema),z.lazy(() => AppScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppScalarWhereWithAggregatesInputSchema),z.lazy(() => AppScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  platformType: z.union([ z.lazy(() => EnumPlatformTypeWithAggregatesFilterSchema),z.lazy(() => PlatformTypeSchema) ]).optional(),
  platformId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  creatorId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  avatar: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  desc: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  language: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  version: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  categoryMain: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  categorySub: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  modelName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  isOpenSource: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  modelArgs: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional()
}).strict();

export const AppActionWhereInputSchema: z.ZodType<Prisma.AppActionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AppActionWhereInputSchema),z.lazy(() => AppActionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppActionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppActionWhereInputSchema),z.lazy(() => AppActionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  appId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  action: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  app: z.union([ z.lazy(() => AppRelationFilterSchema),z.lazy(() => AppWhereInputSchema) ]).optional(),
}).strict();

export const AppActionOrderByWithRelationInputSchema: z.ZodType<Prisma.AppActionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  appId: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  app: z.lazy(() => AppOrderByWithRelationInputSchema).optional()
}).strict();

export const AppActionWhereUniqueInputSchema: z.ZodType<Prisma.AppActionWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => AppActionWhereInputSchema),z.lazy(() => AppActionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppActionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppActionWhereInputSchema),z.lazy(() => AppActionWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  appId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  action: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  app: z.union([ z.lazy(() => AppRelationFilterSchema),z.lazy(() => AppWhereInputSchema) ]).optional(),
}).strict());

export const AppActionOrderByWithAggregationInputSchema: z.ZodType<Prisma.AppActionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  appId: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AppActionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AppActionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AppActionMinOrderByAggregateInputSchema).optional()
}).strict();

export const AppActionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AppActionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AppActionScalarWhereWithAggregatesInputSchema),z.lazy(() => AppActionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppActionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppActionScalarWhereWithAggregatesInputSchema),z.lazy(() => AppActionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  appId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  action: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const AppCategoryWhereInputSchema: z.ZodType<Prisma.AppCategoryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AppCategoryWhereInputSchema),z.lazy(() => AppCategoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppCategoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppCategoryWhereInputSchema),z.lazy(() => AppCategoryWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  main: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  sub: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  App: z.lazy(() => AppListRelationFilterSchema).optional()
}).strict();

export const AppCategoryOrderByWithRelationInputSchema: z.ZodType<Prisma.AppCategoryOrderByWithRelationInput> = z.object({
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  main: z.lazy(() => SortOrderSchema).optional(),
  sub: z.lazy(() => SortOrderSchema).optional(),
  App: z.lazy(() => AppOrderByRelationAggregateInputSchema).optional()
}).strict();

export const AppCategoryWhereUniqueInputSchema: z.ZodType<Prisma.AppCategoryWhereUniqueInput> = z.object({
  id: z.lazy(() => AppCategoryIdCompoundUniqueInputSchema)
})
.and(z.object({
  id: z.lazy(() => AppCategoryIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => AppCategoryWhereInputSchema),z.lazy(() => AppCategoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppCategoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppCategoryWhereInputSchema),z.lazy(() => AppCategoryWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  main: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  sub: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  App: z.lazy(() => AppListRelationFilterSchema).optional()
}).strict());

export const AppCategoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.AppCategoryOrderByWithAggregationInput> = z.object({
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  main: z.lazy(() => SortOrderSchema).optional(),
  sub: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AppCategoryCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AppCategoryAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AppCategoryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AppCategoryMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AppCategorySumOrderByAggregateInputSchema).optional()
}).strict();

export const AppCategoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AppCategoryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AppCategoryScalarWhereWithAggregatesInputSchema),z.lazy(() => AppCategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppCategoryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppCategoryScalarWhereWithAggregatesInputSchema),z.lazy(() => AppCategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  main: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  sub: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const AppCommentWhereInputSchema: z.ZodType<Prisma.AppCommentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AppCommentWhereInputSchema),z.lazy(() => AppCommentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppCommentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppCommentWhereInputSchema),z.lazy(() => AppCommentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  appId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rate: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  aApp: z.union([ z.lazy(() => AppRelationFilterSchema),z.lazy(() => AppWhereInputSchema) ]).optional(),
}).strict();

export const AppCommentOrderByWithRelationInputSchema: z.ZodType<Prisma.AppCommentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  appId: z.lazy(() => SortOrderSchema).optional(),
  title: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  rate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  aApp: z.lazy(() => AppOrderByWithRelationInputSchema).optional()
}).strict();

export const AppCommentWhereUniqueInputSchema: z.ZodType<Prisma.AppCommentWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => AppCommentWhereInputSchema),z.lazy(() => AppCommentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppCommentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppCommentWhereInputSchema),z.lazy(() => AppCommentWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  appId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rate: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  aApp: z.union([ z.lazy(() => AppRelationFilterSchema),z.lazy(() => AppWhereInputSchema) ]).optional(),
}).strict());

export const AppCommentOrderByWithAggregationInputSchema: z.ZodType<Prisma.AppCommentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  appId: z.lazy(() => SortOrderSchema).optional(),
  title: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  rate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => AppCommentCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AppCommentAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AppCommentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AppCommentMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AppCommentSumOrderByAggregateInputSchema).optional()
}).strict();

export const AppCommentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AppCommentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AppCommentScalarWhereWithAggregatesInputSchema),z.lazy(() => AppCommentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppCommentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppCommentScalarWhereWithAggregatesInputSchema),z.lazy(() => AppCommentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  appId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  rate: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const AppStateWhereInputSchema: z.ZodType<Prisma.AppStateWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AppStateWhereInputSchema),z.lazy(() => AppStateWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppStateWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppStateWhereInputSchema),z.lazy(() => AppStateWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  views: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  stars: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  forks: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  tips: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  calls: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  shares: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  appId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  app: z.union([ z.lazy(() => AppRelationFilterSchema),z.lazy(() => AppWhereInputSchema) ]).optional(),
}).strict();

export const AppStateOrderByWithRelationInputSchema: z.ZodType<Prisma.AppStateOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  views: z.lazy(() => SortOrderSchema).optional(),
  stars: z.lazy(() => SortOrderSchema).optional(),
  forks: z.lazy(() => SortOrderSchema).optional(),
  tips: z.lazy(() => SortOrderSchema).optional(),
  calls: z.lazy(() => SortOrderSchema).optional(),
  shares: z.lazy(() => SortOrderSchema).optional(),
  appId: z.lazy(() => SortOrderSchema).optional(),
  app: z.lazy(() => AppOrderByWithRelationInputSchema).optional()
}).strict();

export const AppStateWhereUniqueInputSchema: z.ZodType<Prisma.AppStateWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    appId: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    appId: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  appId: z.string().optional(),
  AND: z.union([ z.lazy(() => AppStateWhereInputSchema),z.lazy(() => AppStateWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppStateWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppStateWhereInputSchema),z.lazy(() => AppStateWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  views: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  stars: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  forks: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  tips: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  calls: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  shares: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  app: z.union([ z.lazy(() => AppRelationFilterSchema),z.lazy(() => AppWhereInputSchema) ]).optional(),
}).strict());

export const AppStateOrderByWithAggregationInputSchema: z.ZodType<Prisma.AppStateOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  views: z.lazy(() => SortOrderSchema).optional(),
  stars: z.lazy(() => SortOrderSchema).optional(),
  forks: z.lazy(() => SortOrderSchema).optional(),
  tips: z.lazy(() => SortOrderSchema).optional(),
  calls: z.lazy(() => SortOrderSchema).optional(),
  shares: z.lazy(() => SortOrderSchema).optional(),
  appId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AppStateCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AppStateAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AppStateMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AppStateMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AppStateSumOrderByAggregateInputSchema).optional()
}).strict();

export const AppStateScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AppStateScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AppStateScalarWhereWithAggregatesInputSchema),z.lazy(() => AppStateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppStateScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppStateScalarWhereWithAggregatesInputSchema),z.lazy(() => AppStateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  views: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  stars: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  forks: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  tips: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  calls: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  shares: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  appId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const AppTagWhereInputSchema: z.ZodType<Prisma.AppTagWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AppTagWhereInputSchema),z.lazy(() => AppTagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppTagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppTagWhereInputSchema),z.lazy(() => AppTagWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  creatorId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  creator: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  apps: z.lazy(() => AppListRelationFilterSchema).optional()
}).strict();

export const AppTagOrderByWithRelationInputSchema: z.ZodType<Prisma.AppTagOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  creatorId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  creator: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  apps: z.lazy(() => AppOrderByRelationAggregateInputSchema).optional()
}).strict();

export const AppTagWhereUniqueInputSchema: z.ZodType<Prisma.AppTagWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => AppTagWhereInputSchema),z.lazy(() => AppTagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppTagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppTagWhereInputSchema),z.lazy(() => AppTagWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  creatorId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  creator: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  apps: z.lazy(() => AppListRelationFilterSchema).optional()
}).strict());

export const AppTagOrderByWithAggregationInputSchema: z.ZodType<Prisma.AppTagOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  creatorId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AppTagCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AppTagMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AppTagMinOrderByAggregateInputSchema).optional()
}).strict();

export const AppTagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AppTagScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AppTagScalarWhereWithAggregatesInputSchema),z.lazy(() => AppTagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppTagScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppTagScalarWhereWithAggregatesInputSchema),z.lazy(() => AppTagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  creatorId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ChatMessageWhereInputSchema: z.ZodType<Prisma.ChatMessageWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ChatMessageWhereInputSchema),z.lazy(() => ChatMessageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChatMessageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChatMessageWhereInputSchema),z.lazy(() => ChatMessageWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => EnumPromptRoleTypeFilterSchema),z.lazy(() => PromptRoleTypeSchema) ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  format: z.union([ z.lazy(() => EnumChatMessageFormatTypeFilterSchema),z.lazy(() => ChatMessageFormatTypeSchema) ]).optional(),
  conversationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  shortId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  namespace: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  userActionOnMessage: z.lazy(() => ChatMessageActionListRelationFilterSchema).optional(),
  conversation: z.union([ z.lazy(() => ConversationRelationFilterSchema),z.lazy(() => ConversationWhereInputSchema) ]).optional(),
}).strict();

export const ChatMessageOrderByWithRelationInputSchema: z.ZodType<Prisma.ChatMessageOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  format: z.lazy(() => SortOrderSchema).optional(),
  conversationId: z.lazy(() => SortOrderSchema).optional(),
  shortId: z.lazy(() => SortOrderSchema).optional(),
  namespace: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  userActionOnMessage: z.lazy(() => ChatMessageActionOrderByRelationAggregateInputSchema).optional(),
  conversation: z.lazy(() => ConversationOrderByWithRelationInputSchema).optional()
}).strict();

export const ChatMessageWhereUniqueInputSchema: z.ZodType<Prisma.ChatMessageWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    id2: z.lazy(() => ChatMessageId2CompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    id2: z.lazy(() => ChatMessageId2CompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  id2: z.lazy(() => ChatMessageId2CompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => ChatMessageWhereInputSchema),z.lazy(() => ChatMessageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChatMessageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChatMessageWhereInputSchema),z.lazy(() => ChatMessageWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => EnumPromptRoleTypeFilterSchema),z.lazy(() => PromptRoleTypeSchema) ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  format: z.union([ z.lazy(() => EnumChatMessageFormatTypeFilterSchema),z.lazy(() => ChatMessageFormatTypeSchema) ]).optional(),
  conversationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  shortId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  namespace: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  userActionOnMessage: z.lazy(() => ChatMessageActionListRelationFilterSchema).optional(),
  conversation: z.union([ z.lazy(() => ConversationRelationFilterSchema),z.lazy(() => ConversationWhereInputSchema) ]).optional(),
}).strict());

export const ChatMessageOrderByWithAggregationInputSchema: z.ZodType<Prisma.ChatMessageOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  format: z.lazy(() => SortOrderSchema).optional(),
  conversationId: z.lazy(() => SortOrderSchema).optional(),
  shortId: z.lazy(() => SortOrderSchema).optional(),
  namespace: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => ChatMessageCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ChatMessageMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ChatMessageMinOrderByAggregateInputSchema).optional()
}).strict();

export const ChatMessageScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ChatMessageScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ChatMessageScalarWhereWithAggregatesInputSchema),z.lazy(() => ChatMessageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChatMessageScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChatMessageScalarWhereWithAggregatesInputSchema),z.lazy(() => ChatMessageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => EnumPromptRoleTypeWithAggregatesFilterSchema),z.lazy(() => PromptRoleTypeSchema) ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  format: z.union([ z.lazy(() => EnumChatMessageFormatTypeWithAggregatesFilterSchema),z.lazy(() => ChatMessageFormatTypeSchema) ]).optional(),
  conversationId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  shortId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  namespace: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ChatMessageActionWhereInputSchema: z.ZodType<Prisma.ChatMessageActionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ChatMessageActionWhereInputSchema),z.lazy(() => ChatMessageActionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChatMessageActionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChatMessageActionWhereInputSchema),z.lazy(() => ChatMessageActionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  messageId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  action: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  message: z.union([ z.lazy(() => ChatMessageRelationFilterSchema),z.lazy(() => ChatMessageWhereInputSchema) ]).optional(),
}).strict();

export const ChatMessageActionOrderByWithRelationInputSchema: z.ZodType<Prisma.ChatMessageActionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  messageId: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  message: z.lazy(() => ChatMessageOrderByWithRelationInputSchema).optional()
}).strict();

export const ChatMessageActionWhereUniqueInputSchema: z.ZodType<Prisma.ChatMessageActionWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => ChatMessageActionWhereInputSchema),z.lazy(() => ChatMessageActionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChatMessageActionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChatMessageActionWhereInputSchema),z.lazy(() => ChatMessageActionWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  messageId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  action: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  message: z.union([ z.lazy(() => ChatMessageRelationFilterSchema),z.lazy(() => ChatMessageWhereInputSchema) ]).optional(),
}).strict());

export const ChatMessageActionOrderByWithAggregationInputSchema: z.ZodType<Prisma.ChatMessageActionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  messageId: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ChatMessageActionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ChatMessageActionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ChatMessageActionMinOrderByAggregateInputSchema).optional()
}).strict();

export const ChatMessageActionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ChatMessageActionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ChatMessageActionScalarWhereWithAggregatesInputSchema),z.lazy(() => ChatMessageActionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChatMessageActionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChatMessageActionScalarWhereWithAggregatesInputSchema),z.lazy(() => ChatMessageActionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  messageId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  action: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ConversationWhereInputSchema: z.ZodType<Prisma.ConversationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ConversationWhereInputSchema),z.lazy(() => ConversationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ConversationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ConversationWhereInputSchema),z.lazy(() => ConversationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  appId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pinned: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  messages: z.lazy(() => ChatMessageListRelationFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  app: z.union([ z.lazy(() => AppRelationFilterSchema),z.lazy(() => AppWhereInputSchema) ]).optional(),
}).strict();

export const ConversationOrderByWithRelationInputSchema: z.ZodType<Prisma.ConversationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  appId: z.lazy(() => SortOrderSchema).optional(),
  pinned: z.lazy(() => SortOrderSchema).optional(),
  messages: z.lazy(() => ChatMessageOrderByRelationAggregateInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  app: z.lazy(() => AppOrderByWithRelationInputSchema).optional()
}).strict();

export const ConversationWhereUniqueInputSchema: z.ZodType<Prisma.ConversationWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    conversation: z.lazy(() => ConversationConversationCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    conversation: z.lazy(() => ConversationConversationCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  conversation: z.lazy(() => ConversationConversationCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => ConversationWhereInputSchema),z.lazy(() => ConversationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ConversationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ConversationWhereInputSchema),z.lazy(() => ConversationWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  appId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pinned: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  messages: z.lazy(() => ChatMessageListRelationFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  app: z.union([ z.lazy(() => AppRelationFilterSchema),z.lazy(() => AppWhereInputSchema) ]).optional(),
}).strict());

export const ConversationOrderByWithAggregationInputSchema: z.ZodType<Prisma.ConversationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  appId: z.lazy(() => SortOrderSchema).optional(),
  pinned: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ConversationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ConversationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ConversationMinOrderByAggregateInputSchema).optional()
}).strict();

export const ConversationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ConversationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ConversationScalarWhereWithAggregatesInputSchema),z.lazy(() => ConversationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ConversationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ConversationScalarWhereWithAggregatesInputSchema),z.lazy(() => ConversationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  appId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  pinned: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const FollowRelationWhereInputSchema: z.ZodType<Prisma.FollowRelationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FollowRelationWhereInputSchema),z.lazy(() => FollowRelationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FollowRelationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FollowRelationWhereInputSchema),z.lazy(() => FollowRelationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  fromId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  toId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  from: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  to: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const FollowRelationOrderByWithRelationInputSchema: z.ZodType<Prisma.FollowRelationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fromId: z.lazy(() => SortOrderSchema).optional(),
  toId: z.lazy(() => SortOrderSchema).optional(),
  from: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  to: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const FollowRelationWhereUniqueInputSchema: z.ZodType<Prisma.FollowRelationWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => FollowRelationWhereInputSchema),z.lazy(() => FollowRelationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FollowRelationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FollowRelationWhereInputSchema),z.lazy(() => FollowRelationWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  fromId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  toId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  from: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  to: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const FollowRelationOrderByWithAggregationInputSchema: z.ZodType<Prisma.FollowRelationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fromId: z.lazy(() => SortOrderSchema).optional(),
  toId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FollowRelationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FollowRelationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FollowRelationMinOrderByAggregateInputSchema).optional()
}).strict();

export const FollowRelationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FollowRelationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FollowRelationScalarWhereWithAggregatesInputSchema),z.lazy(() => FollowRelationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FollowRelationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FollowRelationScalarWhereWithAggregatesInputSchema),z.lazy(() => FollowRelationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  fromId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  toId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const InvitationRelationWhereInputSchema: z.ZodType<Prisma.InvitationRelationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => InvitationRelationWhereInputSchema),z.lazy(() => InvitationRelationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvitationRelationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvitationRelationWhereInputSchema),z.lazy(() => InvitationRelationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumInvitationStatusFilterSchema),z.lazy(() => InvitationStatusSchema) ]).optional(),
  fromId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  toId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  from: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  to: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict();

export const InvitationRelationOrderByWithRelationInputSchema: z.ZodType<Prisma.InvitationRelationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  fromId: z.lazy(() => SortOrderSchema).optional(),
  toId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  from: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  to: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const InvitationRelationWhereUniqueInputSchema: z.ZodType<Prisma.InvitationRelationWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    toId: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    toId: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  toId: z.string().optional(),
  AND: z.union([ z.lazy(() => InvitationRelationWhereInputSchema),z.lazy(() => InvitationRelationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvitationRelationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvitationRelationWhereInputSchema),z.lazy(() => InvitationRelationWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumInvitationStatusFilterSchema),z.lazy(() => InvitationStatusSchema) ]).optional(),
  fromId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  from: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  to: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict());

export const InvitationRelationOrderByWithAggregationInputSchema: z.ZodType<Prisma.InvitationRelationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  fromId: z.lazy(() => SortOrderSchema).optional(),
  toId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => InvitationRelationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => InvitationRelationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => InvitationRelationMinOrderByAggregateInputSchema).optional()
}).strict();

export const InvitationRelationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.InvitationRelationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => InvitationRelationScalarWhereWithAggregatesInputSchema),z.lazy(() => InvitationRelationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvitationRelationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvitationRelationScalarWhereWithAggregatesInputSchema),z.lazy(() => InvitationRelationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumInvitationStatusWithAggregatesFilterSchema),z.lazy(() => InvitationStatusSchema) ]).optional(),
  fromId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  toId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    sessionToken: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    sessionToken: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string().optional(),
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const StarringAppWhereInputSchema: z.ZodType<Prisma.StarringAppWhereInput> = z.object({
  AND: z.union([ z.lazy(() => StarringAppWhereInputSchema),z.lazy(() => StarringAppWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StarringAppWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StarringAppWhereInputSchema),z.lazy(() => StarringAppWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  appId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  app: z.union([ z.lazy(() => AppRelationFilterSchema),z.lazy(() => AppWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const StarringAppOrderByWithRelationInputSchema: z.ZodType<Prisma.StarringAppOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  appId: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  app: z.lazy(() => AppOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const StarringAppWhereUniqueInputSchema: z.ZodType<Prisma.StarringAppWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => StarringAppWhereInputSchema),z.lazy(() => StarringAppWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StarringAppWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StarringAppWhereInputSchema),z.lazy(() => StarringAppWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  appId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  app: z.union([ z.lazy(() => AppRelationFilterSchema),z.lazy(() => AppWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const StarringAppOrderByWithAggregationInputSchema: z.ZodType<Prisma.StarringAppOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  appId: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => StarringAppCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => StarringAppMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => StarringAppMinOrderByAggregateInputSchema).optional()
}).strict();

export const StarringAppScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.StarringAppScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => StarringAppScalarWhereWithAggregatesInputSchema),z.lazy(() => StarringAppScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => StarringAppScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StarringAppScalarWhereWithAggregatesInputSchema),z.lazy(() => StarringAppScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  appId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const TranscationWhereInputSchema: z.ZodType<Prisma.TranscationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TranscationWhereInputSchema),z.lazy(() => TranscationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TranscationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TranscationWhereInputSchema),z.lazy(() => TranscationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const TranscationOrderByWithRelationInputSchema: z.ZodType<Prisma.TranscationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const TranscationWhereUniqueInputSchema: z.ZodType<Prisma.TranscationWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => TranscationWhereInputSchema),z.lazy(() => TranscationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TranscationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TranscationWhereInputSchema),z.lazy(() => TranscationWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const TranscationOrderByWithAggregationInputSchema: z.ZodType<Prisma.TranscationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TranscationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TranscationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TranscationMinOrderByAggregateInputSchema).optional()
}).strict();

export const TranscationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TranscationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TranscationScalarWhereWithAggregatesInputSchema),z.lazy(() => TranscationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TranscationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TranscationScalarWhereWithAggregatesInputSchema),z.lazy(() => TranscationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  platformType: z.union([ z.lazy(() => EnumPlatformTypeFilterSchema),z.lazy(() => PlatformTypeSchema) ]).optional(),
  platformId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  platformArgs: z.lazy(() => JsonNullableFilterSchema).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  balance: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  followedByCount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  followingCount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationListRelationFilterSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationListRelationFilterSchema).optional(),
  followedBy: z.lazy(() => FollowRelationListRelationFilterSchema).optional(),
  following: z.lazy(() => FollowRelationListRelationFilterSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageListRelationFilterSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionListRelationFilterSchema).optional(),
  tags: z.lazy(() => AppTagListRelationFilterSchema).optional(),
  appComments: z.lazy(() => AppCommentListRelationFilterSchema).optional(),
  appActions: z.lazy(() => AppActionListRelationFilterSchema).optional(),
  StarringApp: z.lazy(() => StarringAppListRelationFilterSchema).optional(),
  createdApps: z.lazy(() => AppListRelationFilterSchema).optional(),
  conversations: z.lazy(() => ConversationListRelationFilterSchema).optional(),
  Transcation: z.lazy(() => TranscationListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  platformType: z.lazy(() => SortOrderSchema).optional(),
  platformId: z.lazy(() => SortOrderSchema).optional(),
  platformArgs: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  balance: z.lazy(() => SortOrderSchema).optional(),
  followedByCount: z.lazy(() => SortOrderSchema).optional(),
  followingCount: z.lazy(() => SortOrderSchema).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationOrderByRelationAggregateInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationOrderByRelationAggregateInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationOrderByRelationAggregateInputSchema).optional(),
  following: z.lazy(() => FollowRelationOrderByRelationAggregateInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageOrderByRelationAggregateInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionOrderByRelationAggregateInputSchema).optional(),
  tags: z.lazy(() => AppTagOrderByRelationAggregateInputSchema).optional(),
  appComments: z.lazy(() => AppCommentOrderByRelationAggregateInputSchema).optional(),
  appActions: z.lazy(() => AppActionOrderByRelationAggregateInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppOrderByRelationAggregateInputSchema).optional(),
  createdApps: z.lazy(() => AppOrderByRelationAggregateInputSchema).optional(),
  conversations: z.lazy(() => ConversationOrderByRelationAggregateInputSchema).optional(),
  Transcation: z.lazy(() => TranscationOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    email: z.string(),
    platform: z.lazy(() => UserPlatformCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string(),
    email: z.string(),
  }),
  z.object({
    id: z.string(),
    platform: z.lazy(() => UserPlatformCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    email: z.string(),
    platform: z.lazy(() => UserPlatformCompoundUniqueInputSchema),
  }),
  z.object({
    email: z.string(),
  }),
  z.object({
    platform: z.lazy(() => UserPlatformCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().optional(),
  email: z.string().optional(),
  platform: z.lazy(() => UserPlatformCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  platformType: z.union([ z.lazy(() => EnumPlatformTypeFilterSchema),z.lazy(() => PlatformTypeSchema) ]).optional(),
  platformId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  platformArgs: z.lazy(() => JsonNullableFilterSchema).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  balance: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  followedByCount: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  followingCount: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationListRelationFilterSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationListRelationFilterSchema).optional(),
  followedBy: z.lazy(() => FollowRelationListRelationFilterSchema).optional(),
  following: z.lazy(() => FollowRelationListRelationFilterSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageListRelationFilterSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionListRelationFilterSchema).optional(),
  tags: z.lazy(() => AppTagListRelationFilterSchema).optional(),
  appComments: z.lazy(() => AppCommentListRelationFilterSchema).optional(),
  appActions: z.lazy(() => AppActionListRelationFilterSchema).optional(),
  StarringApp: z.lazy(() => StarringAppListRelationFilterSchema).optional(),
  createdApps: z.lazy(() => AppListRelationFilterSchema).optional(),
  conversations: z.lazy(() => ConversationListRelationFilterSchema).optional(),
  Transcation: z.lazy(() => TranscationListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  platformType: z.lazy(() => SortOrderSchema).optional(),
  platformId: z.lazy(() => SortOrderSchema).optional(),
  platformArgs: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  balance: z.lazy(() => SortOrderSchema).optional(),
  followedByCount: z.lazy(() => SortOrderSchema).optional(),
  followingCount: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  platformType: z.union([ z.lazy(() => EnumPlatformTypeWithAggregatesFilterSchema),z.lazy(() => PlatformTypeSchema) ]).optional(),
  platformId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  platformArgs: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  balance: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  followedByCount: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  followingCount: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const VerificationTokenWhereInputSchema: z.ZodType<Prisma.VerificationTokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VerificationTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithRelationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenWhereUniqueInputSchema: z.ZodType<Prisma.VerificationTokenWhereUniqueInput> = z.union([
  z.object({
    token: z.string(),
    identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema)
  }),
  z.object({
    token: z.string(),
  }),
  z.object({
    identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  token: z.string().optional(),
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const VerificationTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VerificationTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationTokenMinOrderByAggregateInputSchema).optional()
}).strict();

export const VerificationTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  refresh_token_expires_in: z.number().int().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema)
}).strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  refresh_token_expires_in: z.number().int().optional().nullable()
}).strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refresh_token_expires_in: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refresh_token_expires_in: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  refresh_token_expires_in: z.number().int().optional().nullable()
}).strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refresh_token_expires_in: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refresh_token_expires_in: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AppCreateInputSchema: z.ZodType<Prisma.AppCreateInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  avatar: z.string(),
  desc: z.string(),
  language: z.string().optional(),
  version: z.string().optional(),
  modelName: z.string(),
  isOpenSource: z.boolean().optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  creator: z.lazy(() => UserCreateNestedOneWithoutCreatedAppsInputSchema),
  tags: z.lazy(() => AppTagCreateNestedManyWithoutAppsInputSchema).optional(),
  category: z.lazy(() => AppCategoryCreateNestedOneWithoutAppInputSchema),
  actions: z.lazy(() => AppActionCreateNestedManyWithoutAppInputSchema).optional(),
  using: z.lazy(() => ConversationCreateNestedManyWithoutAppInputSchema).optional(),
  starring: z.lazy(() => StarringAppCreateNestedManyWithoutAppInputSchema).optional(),
  comments: z.lazy(() => AppCommentCreateNestedManyWithoutAAppInputSchema).optional(),
  state: z.lazy(() => AppStateCreateNestedOneWithoutAppInputSchema).optional()
}).strict();

export const AppUncheckedCreateInputSchema: z.ZodType<Prisma.AppUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  creatorId: z.string(),
  name: z.string(),
  avatar: z.string(),
  desc: z.string(),
  language: z.string().optional(),
  version: z.string().optional(),
  categoryMain: z.number().int(),
  categorySub: z.number().int(),
  modelName: z.string(),
  isOpenSource: z.boolean().optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  tags: z.lazy(() => AppTagUncheckedCreateNestedManyWithoutAppsInputSchema).optional(),
  actions: z.lazy(() => AppActionUncheckedCreateNestedManyWithoutAppInputSchema).optional(),
  using: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutAppInputSchema).optional(),
  starring: z.lazy(() => StarringAppUncheckedCreateNestedManyWithoutAppInputSchema).optional(),
  comments: z.lazy(() => AppCommentUncheckedCreateNestedManyWithoutAAppInputSchema).optional(),
  state: z.lazy(() => AppStateUncheckedCreateNestedOneWithoutAppInputSchema).optional()
}).strict();

export const AppUpdateInputSchema: z.ZodType<Prisma.AppUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modelName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isOpenSource: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  creator: z.lazy(() => UserUpdateOneRequiredWithoutCreatedAppsNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUpdateManyWithoutAppsNestedInputSchema).optional(),
  category: z.lazy(() => AppCategoryUpdateOneRequiredWithoutAppNestedInputSchema).optional(),
  actions: z.lazy(() => AppActionUpdateManyWithoutAppNestedInputSchema).optional(),
  using: z.lazy(() => ConversationUpdateManyWithoutAppNestedInputSchema).optional(),
  starring: z.lazy(() => StarringAppUpdateManyWithoutAppNestedInputSchema).optional(),
  comments: z.lazy(() => AppCommentUpdateManyWithoutAAppNestedInputSchema).optional(),
  state: z.lazy(() => AppStateUpdateOneWithoutAppNestedInputSchema).optional()
}).strict();

export const AppUncheckedUpdateInputSchema: z.ZodType<Prisma.AppUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  creatorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryMain: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  categorySub: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  modelName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isOpenSource: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  tags: z.lazy(() => AppTagUncheckedUpdateManyWithoutAppsNestedInputSchema).optional(),
  actions: z.lazy(() => AppActionUncheckedUpdateManyWithoutAppNestedInputSchema).optional(),
  using: z.lazy(() => ConversationUncheckedUpdateManyWithoutAppNestedInputSchema).optional(),
  starring: z.lazy(() => StarringAppUncheckedUpdateManyWithoutAppNestedInputSchema).optional(),
  comments: z.lazy(() => AppCommentUncheckedUpdateManyWithoutAAppNestedInputSchema).optional(),
  state: z.lazy(() => AppStateUncheckedUpdateOneWithoutAppNestedInputSchema).optional()
}).strict();

export const AppCreateManyInputSchema: z.ZodType<Prisma.AppCreateManyInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  creatorId: z.string(),
  name: z.string(),
  avatar: z.string(),
  desc: z.string(),
  language: z.string().optional(),
  version: z.string().optional(),
  categoryMain: z.number().int(),
  categorySub: z.number().int(),
  modelName: z.string(),
  isOpenSource: z.boolean().optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const AppUpdateManyMutationInputSchema: z.ZodType<Prisma.AppUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modelName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isOpenSource: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const AppUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AppUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  creatorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryMain: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  categorySub: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  modelName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isOpenSource: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const AppActionCreateInputSchema: z.ZodType<Prisma.AppActionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  action: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutAppActionsInputSchema).optional(),
  app: z.lazy(() => AppCreateNestedOneWithoutActionsInputSchema)
}).strict();

export const AppActionUncheckedCreateInputSchema: z.ZodType<Prisma.AppActionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  userId: z.string().optional().nullable(),
  appId: z.string(),
  action: z.string()
}).strict();

export const AppActionUpdateInputSchema: z.ZodType<Prisma.AppActionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutAppActionsNestedInputSchema).optional(),
  app: z.lazy(() => AppUpdateOneRequiredWithoutActionsNestedInputSchema).optional()
}).strict();

export const AppActionUncheckedUpdateInputSchema: z.ZodType<Prisma.AppActionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  appId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AppActionCreateManyInputSchema: z.ZodType<Prisma.AppActionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  userId: z.string().optional().nullable(),
  appId: z.string(),
  action: z.string()
}).strict();

export const AppActionUpdateManyMutationInputSchema: z.ZodType<Prisma.AppActionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AppActionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AppActionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  appId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AppCategoryCreateInputSchema: z.ZodType<Prisma.AppCategoryCreateInput> = z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  main: z.number().int(),
  sub: z.number().int(),
  App: z.lazy(() => AppCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const AppCategoryUncheckedCreateInputSchema: z.ZodType<Prisma.AppCategoryUncheckedCreateInput> = z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  main: z.number().int(),
  sub: z.number().int(),
  App: z.lazy(() => AppUncheckedCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const AppCategoryUpdateInputSchema: z.ZodType<Prisma.AppCategoryUpdateInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  main: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sub: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  App: z.lazy(() => AppUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const AppCategoryUncheckedUpdateInputSchema: z.ZodType<Prisma.AppCategoryUncheckedUpdateInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  main: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sub: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  App: z.lazy(() => AppUncheckedUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const AppCategoryCreateManyInputSchema: z.ZodType<Prisma.AppCategoryCreateManyInput> = z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  main: z.number().int(),
  sub: z.number().int()
}).strict();

export const AppCategoryUpdateManyMutationInputSchema: z.ZodType<Prisma.AppCategoryUpdateManyMutationInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  main: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sub: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AppCategoryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AppCategoryUncheckedUpdateManyInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  main: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sub: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AppCommentCreateInputSchema: z.ZodType<Prisma.AppCommentCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  title: z.string().optional().nullable(),
  content: z.string(),
  rate: z.number().int().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutAppCommentsInputSchema),
  aApp: z.lazy(() => AppCreateNestedOneWithoutCommentsInputSchema)
}).strict();

export const AppCommentUncheckedCreateInputSchema: z.ZodType<Prisma.AppCommentUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  appId: z.string(),
  title: z.string().optional().nullable(),
  content: z.string(),
  rate: z.number().int().optional().nullable()
}).strict();

export const AppCommentUpdateInputSchema: z.ZodType<Prisma.AppCommentUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rate: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAppCommentsNestedInputSchema).optional(),
  aApp: z.lazy(() => AppUpdateOneRequiredWithoutCommentsNestedInputSchema).optional()
}).strict();

export const AppCommentUncheckedUpdateInputSchema: z.ZodType<Prisma.AppCommentUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  appId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rate: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AppCommentCreateManyInputSchema: z.ZodType<Prisma.AppCommentCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  appId: z.string(),
  title: z.string().optional().nullable(),
  content: z.string(),
  rate: z.number().int().optional().nullable()
}).strict();

export const AppCommentUpdateManyMutationInputSchema: z.ZodType<Prisma.AppCommentUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rate: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AppCommentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AppCommentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  appId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rate: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AppStateCreateInputSchema: z.ZodType<Prisma.AppStateCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  views: z.number().int().optional(),
  stars: z.number().int().optional(),
  forks: z.number().int().optional(),
  tips: z.number().optional(),
  calls: z.number().int().optional(),
  shares: z.number().int().optional(),
  app: z.lazy(() => AppCreateNestedOneWithoutStateInputSchema)
}).strict();

export const AppStateUncheckedCreateInputSchema: z.ZodType<Prisma.AppStateUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  views: z.number().int().optional(),
  stars: z.number().int().optional(),
  forks: z.number().int().optional(),
  tips: z.number().optional(),
  calls: z.number().int().optional(),
  shares: z.number().int().optional(),
  appId: z.string()
}).strict();

export const AppStateUpdateInputSchema: z.ZodType<Prisma.AppStateUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  stars: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  forks: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tips: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  calls: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  shares: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  app: z.lazy(() => AppUpdateOneRequiredWithoutStateNestedInputSchema).optional()
}).strict();

export const AppStateUncheckedUpdateInputSchema: z.ZodType<Prisma.AppStateUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  stars: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  forks: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tips: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  calls: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  shares: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  appId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AppStateCreateManyInputSchema: z.ZodType<Prisma.AppStateCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  views: z.number().int().optional(),
  stars: z.number().int().optional(),
  forks: z.number().int().optional(),
  tips: z.number().optional(),
  calls: z.number().int().optional(),
  shares: z.number().int().optional(),
  appId: z.string()
}).strict();

export const AppStateUpdateManyMutationInputSchema: z.ZodType<Prisma.AppStateUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  stars: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  forks: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tips: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  calls: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  shares: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AppStateUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AppStateUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  stars: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  forks: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tips: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  calls: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  shares: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  appId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AppTagCreateInputSchema: z.ZodType<Prisma.AppTagCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  name: z.string(),
  creator: z.lazy(() => UserCreateNestedOneWithoutTagsInputSchema).optional(),
  apps: z.lazy(() => AppCreateNestedManyWithoutTagsInputSchema).optional()
}).strict();

export const AppTagUncheckedCreateInputSchema: z.ZodType<Prisma.AppTagUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  creatorId: z.string().optional().nullable(),
  name: z.string(),
  apps: z.lazy(() => AppUncheckedCreateNestedManyWithoutTagsInputSchema).optional()
}).strict();

export const AppTagUpdateInputSchema: z.ZodType<Prisma.AppTagUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  creator: z.lazy(() => UserUpdateOneWithoutTagsNestedInputSchema).optional(),
  apps: z.lazy(() => AppUpdateManyWithoutTagsNestedInputSchema).optional()
}).strict();

export const AppTagUncheckedUpdateInputSchema: z.ZodType<Prisma.AppTagUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  creatorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  apps: z.lazy(() => AppUncheckedUpdateManyWithoutTagsNestedInputSchema).optional()
}).strict();

export const AppTagCreateManyInputSchema: z.ZodType<Prisma.AppTagCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  creatorId: z.string().optional().nullable(),
  name: z.string()
}).strict();

export const AppTagUpdateManyMutationInputSchema: z.ZodType<Prisma.AppTagUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AppTagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AppTagUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  creatorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChatMessageCreateInputSchema: z.ZodType<Prisma.ChatMessageCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => PromptRoleTypeSchema).optional(),
  content: z.string(),
  format: z.lazy(() => ChatMessageFormatTypeSchema).optional(),
  shortId: z.string().optional(),
  namespace: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutChatMessagesInputSchema).optional(),
  userActionOnMessage: z.lazy(() => ChatMessageActionCreateNestedManyWithoutMessageInputSchema).optional(),
  conversation: z.lazy(() => ConversationCreateNestedOneWithoutMessagesInputSchema)
}).strict();

export const ChatMessageUncheckedCreateInputSchema: z.ZodType<Prisma.ChatMessageUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string().optional().nullable(),
  role: z.lazy(() => PromptRoleTypeSchema).optional(),
  content: z.string(),
  format: z.lazy(() => ChatMessageFormatTypeSchema).optional(),
  conversationId: z.string(),
  shortId: z.string().optional(),
  namespace: z.string().optional().nullable(),
  userActionOnMessage: z.lazy(() => ChatMessageActionUncheckedCreateNestedManyWithoutMessageInputSchema).optional()
}).strict();

export const ChatMessageUpdateInputSchema: z.ZodType<Prisma.ChatMessageUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => PromptRoleTypeSchema),z.lazy(() => EnumPromptRoleTypeFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  format: z.union([ z.lazy(() => ChatMessageFormatTypeSchema),z.lazy(() => EnumChatMessageFormatTypeFieldUpdateOperationsInputSchema) ]).optional(),
  shortId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  namespace: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneWithoutChatMessagesNestedInputSchema).optional(),
  userActionOnMessage: z.lazy(() => ChatMessageActionUpdateManyWithoutMessageNestedInputSchema).optional(),
  conversation: z.lazy(() => ConversationUpdateOneRequiredWithoutMessagesNestedInputSchema).optional()
}).strict();

export const ChatMessageUncheckedUpdateInputSchema: z.ZodType<Prisma.ChatMessageUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => PromptRoleTypeSchema),z.lazy(() => EnumPromptRoleTypeFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  format: z.union([ z.lazy(() => ChatMessageFormatTypeSchema),z.lazy(() => EnumChatMessageFormatTypeFieldUpdateOperationsInputSchema) ]).optional(),
  conversationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  shortId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  namespace: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userActionOnMessage: z.lazy(() => ChatMessageActionUncheckedUpdateManyWithoutMessageNestedInputSchema).optional()
}).strict();

export const ChatMessageCreateManyInputSchema: z.ZodType<Prisma.ChatMessageCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string().optional().nullable(),
  role: z.lazy(() => PromptRoleTypeSchema).optional(),
  content: z.string(),
  format: z.lazy(() => ChatMessageFormatTypeSchema).optional(),
  conversationId: z.string(),
  shortId: z.string().optional(),
  namespace: z.string().optional().nullable()
}).strict();

export const ChatMessageUpdateManyMutationInputSchema: z.ZodType<Prisma.ChatMessageUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => PromptRoleTypeSchema),z.lazy(() => EnumPromptRoleTypeFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  format: z.union([ z.lazy(() => ChatMessageFormatTypeSchema),z.lazy(() => EnumChatMessageFormatTypeFieldUpdateOperationsInputSchema) ]).optional(),
  shortId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  namespace: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ChatMessageUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ChatMessageUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => PromptRoleTypeSchema),z.lazy(() => EnumPromptRoleTypeFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  format: z.union([ z.lazy(() => ChatMessageFormatTypeSchema),z.lazy(() => EnumChatMessageFormatTypeFieldUpdateOperationsInputSchema) ]).optional(),
  conversationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  shortId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  namespace: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ChatMessageActionCreateInputSchema: z.ZodType<Prisma.ChatMessageActionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  action: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutChatMessageActionsInputSchema),
  message: z.lazy(() => ChatMessageCreateNestedOneWithoutUserActionOnMessageInputSchema)
}).strict();

export const ChatMessageActionUncheckedCreateInputSchema: z.ZodType<Prisma.ChatMessageActionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  messageId: z.string(),
  action: z.string()
}).strict();

export const ChatMessageActionUpdateInputSchema: z.ZodType<Prisma.ChatMessageActionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutChatMessageActionsNestedInputSchema).optional(),
  message: z.lazy(() => ChatMessageUpdateOneRequiredWithoutUserActionOnMessageNestedInputSchema).optional()
}).strict();

export const ChatMessageActionUncheckedUpdateInputSchema: z.ZodType<Prisma.ChatMessageActionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  messageId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChatMessageActionCreateManyInputSchema: z.ZodType<Prisma.ChatMessageActionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  messageId: z.string(),
  action: z.string()
}).strict();

export const ChatMessageActionUpdateManyMutationInputSchema: z.ZodType<Prisma.ChatMessageActionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChatMessageActionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ChatMessageActionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  messageId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ConversationCreateInputSchema: z.ZodType<Prisma.ConversationCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isActive: z.boolean().optional(),
  pinned: z.boolean().optional(),
  messages: z.lazy(() => ChatMessageCreateNestedManyWithoutConversationInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutConversationsInputSchema),
  app: z.lazy(() => AppCreateNestedOneWithoutUsingInputSchema)
}).strict();

export const ConversationUncheckedCreateInputSchema: z.ZodType<Prisma.ConversationUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isActive: z.boolean().optional(),
  userId: z.string(),
  appId: z.string(),
  pinned: z.boolean().optional(),
  messages: z.lazy(() => ChatMessageUncheckedCreateNestedManyWithoutConversationInputSchema).optional()
}).strict();

export const ConversationUpdateInputSchema: z.ZodType<Prisma.ConversationUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  pinned: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  messages: z.lazy(() => ChatMessageUpdateManyWithoutConversationNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutConversationsNestedInputSchema).optional(),
  app: z.lazy(() => AppUpdateOneRequiredWithoutUsingNestedInputSchema).optional()
}).strict();

export const ConversationUncheckedUpdateInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  appId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pinned: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  messages: z.lazy(() => ChatMessageUncheckedUpdateManyWithoutConversationNestedInputSchema).optional()
}).strict();

export const ConversationCreateManyInputSchema: z.ZodType<Prisma.ConversationCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isActive: z.boolean().optional(),
  userId: z.string(),
  appId: z.string(),
  pinned: z.boolean().optional()
}).strict();

export const ConversationUpdateManyMutationInputSchema: z.ZodType<Prisma.ConversationUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  pinned: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ConversationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  appId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pinned: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FollowRelationCreateInputSchema: z.ZodType<Prisma.FollowRelationCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  from: z.lazy(() => UserCreateNestedOneWithoutFollowedByInputSchema),
  to: z.lazy(() => UserCreateNestedOneWithoutFollowingInputSchema)
}).strict();

export const FollowRelationUncheckedCreateInputSchema: z.ZodType<Prisma.FollowRelationUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fromId: z.string(),
  toId: z.string()
}).strict();

export const FollowRelationUpdateInputSchema: z.ZodType<Prisma.FollowRelationUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  from: z.lazy(() => UserUpdateOneRequiredWithoutFollowedByNestedInputSchema).optional(),
  to: z.lazy(() => UserUpdateOneRequiredWithoutFollowingNestedInputSchema).optional()
}).strict();

export const FollowRelationUncheckedUpdateInputSchema: z.ZodType<Prisma.FollowRelationUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fromId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  toId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FollowRelationCreateManyInputSchema: z.ZodType<Prisma.FollowRelationCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fromId: z.string(),
  toId: z.string()
}).strict();

export const FollowRelationUpdateManyMutationInputSchema: z.ZodType<Prisma.FollowRelationUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FollowRelationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FollowRelationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fromId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  toId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvitationRelationCreateInputSchema: z.ZodType<Prisma.InvitationRelationCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  status: z.lazy(() => InvitationStatusSchema).optional(),
  from: z.lazy(() => UserCreateNestedOneWithoutInvitedFromInputSchema).optional(),
  to: z.lazy(() => UserCreateNestedOneWithoutInvitedToInputSchema).optional()
}).strict();

export const InvitationRelationUncheckedCreateInputSchema: z.ZodType<Prisma.InvitationRelationUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  status: z.lazy(() => InvitationStatusSchema).optional(),
  fromId: z.string(),
  toId: z.string().optional().nullable()
}).strict();

export const InvitationRelationUpdateInputSchema: z.ZodType<Prisma.InvitationRelationUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => InvitationStatusSchema),z.lazy(() => EnumInvitationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  from: z.lazy(() => UserUpdateOneWithoutInvitedFromNestedInputSchema).optional(),
  to: z.lazy(() => UserUpdateOneWithoutInvitedToNestedInputSchema).optional()
}).strict();

export const InvitationRelationUncheckedUpdateInputSchema: z.ZodType<Prisma.InvitationRelationUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => InvitationStatusSchema),z.lazy(() => EnumInvitationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  fromId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  toId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const InvitationRelationCreateManyInputSchema: z.ZodType<Prisma.InvitationRelationCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  status: z.lazy(() => InvitationStatusSchema).optional(),
  fromId: z.string(),
  toId: z.string().optional().nullable()
}).strict();

export const InvitationRelationUpdateManyMutationInputSchema: z.ZodType<Prisma.InvitationRelationUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => InvitationStatusSchema),z.lazy(() => EnumInvitationStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvitationRelationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.InvitationRelationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => InvitationStatusSchema),z.lazy(() => EnumInvitationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  fromId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  toId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StarringAppCreateInputSchema: z.ZodType<Prisma.StarringAppCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isActive: z.boolean().optional(),
  app: z.lazy(() => AppCreateNestedOneWithoutStarringInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutStarringAppInputSchema)
}).strict();

export const StarringAppUncheckedCreateInputSchema: z.ZodType<Prisma.StarringAppUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  appId: z.string(),
  isActive: z.boolean().optional(),
  userId: z.string()
}).strict();

export const StarringAppUpdateInputSchema: z.ZodType<Prisma.StarringAppUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  app: z.lazy(() => AppUpdateOneRequiredWithoutStarringNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutStarringAppNestedInputSchema).optional()
}).strict();

export const StarringAppUncheckedUpdateInputSchema: z.ZodType<Prisma.StarringAppUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  appId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StarringAppCreateManyInputSchema: z.ZodType<Prisma.StarringAppCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  appId: z.string(),
  isActive: z.boolean().optional(),
  userId: z.string()
}).strict();

export const StarringAppUpdateManyMutationInputSchema: z.ZodType<Prisma.StarringAppUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StarringAppUncheckedUpdateManyInputSchema: z.ZodType<Prisma.StarringAppUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  appId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TranscationCreateInputSchema: z.ZodType<Prisma.TranscationCreateInput> = z.object({
  id: z.string().cuid().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutTranscationInputSchema)
}).strict();

export const TranscationUncheckedCreateInputSchema: z.ZodType<Prisma.TranscationUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string()
}).strict();

export const TranscationUpdateInputSchema: z.ZodType<Prisma.TranscationUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutTranscationNestedInputSchema).optional()
}).strict();

export const TranscationUncheckedUpdateInputSchema: z.ZodType<Prisma.TranscationUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TranscationCreateManyInputSchema: z.ZodType<Prisma.TranscationCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string()
}).strict();

export const TranscationUpdateManyMutationInputSchema: z.ZodType<Prisma.TranscationUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TranscationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TranscationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  followedByCount: z.number().int().optional(),
  followingCount: z.number().int().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationCreateNestedManyWithoutFromInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationCreateNestedManyWithoutToInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationCreateNestedManyWithoutFromInputSchema).optional(),
  following: z.lazy(() => FollowRelationCreateNestedManyWithoutToInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageCreateNestedManyWithoutUserInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionCreateNestedManyWithoutUserInputSchema).optional(),
  tags: z.lazy(() => AppTagCreateNestedManyWithoutCreatorInputSchema).optional(),
  appComments: z.lazy(() => AppCommentCreateNestedManyWithoutUserInputSchema).optional(),
  appActions: z.lazy(() => AppActionCreateNestedManyWithoutUserInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppCreateNestedManyWithoutUserInputSchema).optional(),
  createdApps: z.lazy(() => AppCreateNestedManyWithoutCreatorInputSchema).optional(),
  conversations: z.lazy(() => ConversationCreateNestedManyWithoutUserInputSchema).optional(),
  Transcation: z.lazy(() => TranscationCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  followedByCount: z.number().int().optional(),
  followingCount: z.number().int().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUncheckedCreateNestedManyWithoutFromInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUncheckedCreateNestedManyWithoutToInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUncheckedCreateNestedManyWithoutFromInputSchema).optional(),
  following: z.lazy(() => FollowRelationUncheckedCreateNestedManyWithoutToInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  tags: z.lazy(() => AppTagUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  appActions: z.lazy(() => AppActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdApps: z.lazy(() => AppUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  conversations: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followedByCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUpdateManyWithoutFromNestedInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUpdateManyWithoutToNestedInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUpdateManyWithoutFromNestedInputSchema).optional(),
  following: z.lazy(() => FollowRelationUpdateManyWithoutToNestedInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUpdateManyWithoutUserNestedInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUpdateManyWithoutUserNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUpdateManyWithoutCreatorNestedInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUpdateManyWithoutUserNestedInputSchema).optional(),
  appActions: z.lazy(() => AppActionUpdateManyWithoutUserNestedInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUpdateManyWithoutUserNestedInputSchema).optional(),
  createdApps: z.lazy(() => AppUpdateManyWithoutCreatorNestedInputSchema).optional(),
  conversations: z.lazy(() => ConversationUpdateManyWithoutUserNestedInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followedByCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUncheckedUpdateManyWithoutFromNestedInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUncheckedUpdateManyWithoutToNestedInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUncheckedUpdateManyWithoutFromNestedInputSchema).optional(),
  following: z.lazy(() => FollowRelationUncheckedUpdateManyWithoutToNestedInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  appActions: z.lazy(() => AppActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdApps: z.lazy(() => AppUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  conversations: z.lazy(() => ConversationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  followedByCount: z.number().int().optional(),
  followingCount: z.number().int().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followedByCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followedByCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateInputSchema: z.ZodType<Prisma.VerificationTokenCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateManyInputSchema: z.ZodType<Prisma.VerificationTokenCreateManyInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationTokenUpdateManyMutationInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const AccountProviderProviderAccountIdCompoundUniqueInputSchema: z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput> = z.object({
  provider: z.string(),
  providerAccountId: z.string()
}).strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  refresh_token_expires_in: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  refresh_token_expires_in: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  refresh_token_expires_in: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  refresh_token_expires_in: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  refresh_token_expires_in: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const EnumPlatformTypeFilterSchema: z.ZodType<Prisma.EnumPlatformTypeFilter> = z.object({
  equals: z.lazy(() => PlatformTypeSchema).optional(),
  in: z.lazy(() => PlatformTypeSchema).array().optional(),
  notIn: z.lazy(() => PlatformTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => NestedEnumPlatformTypeFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const JsonNullableFilterSchema: z.ZodType<Prisma.JsonNullableFilter> = z.object({
  equals: InputJsonValue.optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: InputJsonValue.optional()
}).strict();

export const AppTagListRelationFilterSchema: z.ZodType<Prisma.AppTagListRelationFilter> = z.object({
  every: z.lazy(() => AppTagWhereInputSchema).optional(),
  some: z.lazy(() => AppTagWhereInputSchema).optional(),
  none: z.lazy(() => AppTagWhereInputSchema).optional()
}).strict();

export const AppCategoryRelationFilterSchema: z.ZodType<Prisma.AppCategoryRelationFilter> = z.object({
  is: z.lazy(() => AppCategoryWhereInputSchema).optional(),
  isNot: z.lazy(() => AppCategoryWhereInputSchema).optional()
}).strict();

export const AppActionListRelationFilterSchema: z.ZodType<Prisma.AppActionListRelationFilter> = z.object({
  every: z.lazy(() => AppActionWhereInputSchema).optional(),
  some: z.lazy(() => AppActionWhereInputSchema).optional(),
  none: z.lazy(() => AppActionWhereInputSchema).optional()
}).strict();

export const ConversationListRelationFilterSchema: z.ZodType<Prisma.ConversationListRelationFilter> = z.object({
  every: z.lazy(() => ConversationWhereInputSchema).optional(),
  some: z.lazy(() => ConversationWhereInputSchema).optional(),
  none: z.lazy(() => ConversationWhereInputSchema).optional()
}).strict();

export const StarringAppListRelationFilterSchema: z.ZodType<Prisma.StarringAppListRelationFilter> = z.object({
  every: z.lazy(() => StarringAppWhereInputSchema).optional(),
  some: z.lazy(() => StarringAppWhereInputSchema).optional(),
  none: z.lazy(() => StarringAppWhereInputSchema).optional()
}).strict();

export const AppCommentListRelationFilterSchema: z.ZodType<Prisma.AppCommentListRelationFilter> = z.object({
  every: z.lazy(() => AppCommentWhereInputSchema).optional(),
  some: z.lazy(() => AppCommentWhereInputSchema).optional(),
  none: z.lazy(() => AppCommentWhereInputSchema).optional()
}).strict();

export const AppStateNullableRelationFilterSchema: z.ZodType<Prisma.AppStateNullableRelationFilter> = z.object({
  is: z.lazy(() => AppStateWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => AppStateWhereInputSchema).optional().nullable()
}).strict();

export const AppTagOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AppTagOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AppActionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AppActionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ConversationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ConversationOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StarringAppOrderByRelationAggregateInputSchema: z.ZodType<Prisma.StarringAppOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AppCommentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AppCommentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AppPlatformCompoundUniqueInputSchema: z.ZodType<Prisma.AppPlatformCompoundUniqueInput> = z.object({
  platformType: z.lazy(() => PlatformTypeSchema),
  platformId: z.string()
}).strict();

export const AppCountOrderByAggregateInputSchema: z.ZodType<Prisma.AppCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  platformType: z.lazy(() => SortOrderSchema).optional(),
  platformId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  creatorId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  desc: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  categoryMain: z.lazy(() => SortOrderSchema).optional(),
  categorySub: z.lazy(() => SortOrderSchema).optional(),
  modelName: z.lazy(() => SortOrderSchema).optional(),
  isOpenSource: z.lazy(() => SortOrderSchema).optional(),
  modelArgs: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AppAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AppAvgOrderByAggregateInput> = z.object({
  categoryMain: z.lazy(() => SortOrderSchema).optional(),
  categorySub: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AppMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AppMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  platformType: z.lazy(() => SortOrderSchema).optional(),
  platformId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  creatorId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  desc: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  categoryMain: z.lazy(() => SortOrderSchema).optional(),
  categorySub: z.lazy(() => SortOrderSchema).optional(),
  modelName: z.lazy(() => SortOrderSchema).optional(),
  isOpenSource: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AppMinOrderByAggregateInputSchema: z.ZodType<Prisma.AppMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  platformType: z.lazy(() => SortOrderSchema).optional(),
  platformId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  creatorId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  desc: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  categoryMain: z.lazy(() => SortOrderSchema).optional(),
  categorySub: z.lazy(() => SortOrderSchema).optional(),
  modelName: z.lazy(() => SortOrderSchema).optional(),
  isOpenSource: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AppSumOrderByAggregateInputSchema: z.ZodType<Prisma.AppSumOrderByAggregateInput> = z.object({
  categoryMain: z.lazy(() => SortOrderSchema).optional(),
  categorySub: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumPlatformTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumPlatformTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PlatformTypeSchema).optional(),
  in: z.lazy(() => PlatformTypeSchema).array().optional(),
  notIn: z.lazy(() => PlatformTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => NestedEnumPlatformTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPlatformTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPlatformTypeFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const JsonNullableWithAggregatesFilterSchema: z.ZodType<Prisma.JsonNullableWithAggregatesFilter> = z.object({
  equals: InputJsonValue.optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: InputJsonValue.optional(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonNullableFilterSchema).optional()
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserNullableRelationFilterSchema: z.ZodType<Prisma.UserNullableRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable()
}).strict();

export const AppRelationFilterSchema: z.ZodType<Prisma.AppRelationFilter> = z.object({
  is: z.lazy(() => AppWhereInputSchema).optional(),
  isNot: z.lazy(() => AppWhereInputSchema).optional()
}).strict();

export const AppActionCountOrderByAggregateInputSchema: z.ZodType<Prisma.AppActionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  appId: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AppActionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AppActionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  appId: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AppActionMinOrderByAggregateInputSchema: z.ZodType<Prisma.AppActionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  appId: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const AppListRelationFilterSchema: z.ZodType<Prisma.AppListRelationFilter> = z.object({
  every: z.lazy(() => AppWhereInputSchema).optional(),
  some: z.lazy(() => AppWhereInputSchema).optional(),
  none: z.lazy(() => AppWhereInputSchema).optional()
}).strict();

export const AppOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AppOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AppCategoryIdCompoundUniqueInputSchema: z.ZodType<Prisma.AppCategoryIdCompoundUniqueInput> = z.object({
  main: z.number(),
  sub: z.number()
}).strict();

export const AppCategoryCountOrderByAggregateInputSchema: z.ZodType<Prisma.AppCategoryCountOrderByAggregateInput> = z.object({
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  main: z.lazy(() => SortOrderSchema).optional(),
  sub: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AppCategoryAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AppCategoryAvgOrderByAggregateInput> = z.object({
  main: z.lazy(() => SortOrderSchema).optional(),
  sub: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AppCategoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AppCategoryMaxOrderByAggregateInput> = z.object({
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  main: z.lazy(() => SortOrderSchema).optional(),
  sub: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AppCategoryMinOrderByAggregateInputSchema: z.ZodType<Prisma.AppCategoryMinOrderByAggregateInput> = z.object({
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  main: z.lazy(() => SortOrderSchema).optional(),
  sub: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AppCategorySumOrderByAggregateInputSchema: z.ZodType<Prisma.AppCategorySumOrderByAggregateInput> = z.object({
  main: z.lazy(() => SortOrderSchema).optional(),
  sub: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AppCommentCountOrderByAggregateInputSchema: z.ZodType<Prisma.AppCommentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  appId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  rate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AppCommentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AppCommentAvgOrderByAggregateInput> = z.object({
  rate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AppCommentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AppCommentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  appId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  rate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AppCommentMinOrderByAggregateInputSchema: z.ZodType<Prisma.AppCommentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  appId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  rate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AppCommentSumOrderByAggregateInputSchema: z.ZodType<Prisma.AppCommentSumOrderByAggregateInput> = z.object({
  rate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const AppStateCountOrderByAggregateInputSchema: z.ZodType<Prisma.AppStateCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  views: z.lazy(() => SortOrderSchema).optional(),
  stars: z.lazy(() => SortOrderSchema).optional(),
  forks: z.lazy(() => SortOrderSchema).optional(),
  tips: z.lazy(() => SortOrderSchema).optional(),
  calls: z.lazy(() => SortOrderSchema).optional(),
  shares: z.lazy(() => SortOrderSchema).optional(),
  appId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AppStateAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AppStateAvgOrderByAggregateInput> = z.object({
  views: z.lazy(() => SortOrderSchema).optional(),
  stars: z.lazy(() => SortOrderSchema).optional(),
  forks: z.lazy(() => SortOrderSchema).optional(),
  tips: z.lazy(() => SortOrderSchema).optional(),
  calls: z.lazy(() => SortOrderSchema).optional(),
  shares: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AppStateMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AppStateMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  views: z.lazy(() => SortOrderSchema).optional(),
  stars: z.lazy(() => SortOrderSchema).optional(),
  forks: z.lazy(() => SortOrderSchema).optional(),
  tips: z.lazy(() => SortOrderSchema).optional(),
  calls: z.lazy(() => SortOrderSchema).optional(),
  shares: z.lazy(() => SortOrderSchema).optional(),
  appId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AppStateMinOrderByAggregateInputSchema: z.ZodType<Prisma.AppStateMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  views: z.lazy(() => SortOrderSchema).optional(),
  stars: z.lazy(() => SortOrderSchema).optional(),
  forks: z.lazy(() => SortOrderSchema).optional(),
  tips: z.lazy(() => SortOrderSchema).optional(),
  calls: z.lazy(() => SortOrderSchema).optional(),
  shares: z.lazy(() => SortOrderSchema).optional(),
  appId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AppStateSumOrderByAggregateInputSchema: z.ZodType<Prisma.AppStateSumOrderByAggregateInput> = z.object({
  views: z.lazy(() => SortOrderSchema).optional(),
  stars: z.lazy(() => SortOrderSchema).optional(),
  forks: z.lazy(() => SortOrderSchema).optional(),
  tips: z.lazy(() => SortOrderSchema).optional(),
  calls: z.lazy(() => SortOrderSchema).optional(),
  shares: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const AppTagCountOrderByAggregateInputSchema: z.ZodType<Prisma.AppTagCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  creatorId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AppTagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AppTagMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  creatorId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AppTagMinOrderByAggregateInputSchema: z.ZodType<Prisma.AppTagMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  creatorId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumPromptRoleTypeFilterSchema: z.ZodType<Prisma.EnumPromptRoleTypeFilter> = z.object({
  equals: z.lazy(() => PromptRoleTypeSchema).optional(),
  in: z.lazy(() => PromptRoleTypeSchema).array().optional(),
  notIn: z.lazy(() => PromptRoleTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => PromptRoleTypeSchema),z.lazy(() => NestedEnumPromptRoleTypeFilterSchema) ]).optional(),
}).strict();

export const EnumChatMessageFormatTypeFilterSchema: z.ZodType<Prisma.EnumChatMessageFormatTypeFilter> = z.object({
  equals: z.lazy(() => ChatMessageFormatTypeSchema).optional(),
  in: z.lazy(() => ChatMessageFormatTypeSchema).array().optional(),
  notIn: z.lazy(() => ChatMessageFormatTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ChatMessageFormatTypeSchema),z.lazy(() => NestedEnumChatMessageFormatTypeFilterSchema) ]).optional(),
}).strict();

export const ChatMessageActionListRelationFilterSchema: z.ZodType<Prisma.ChatMessageActionListRelationFilter> = z.object({
  every: z.lazy(() => ChatMessageActionWhereInputSchema).optional(),
  some: z.lazy(() => ChatMessageActionWhereInputSchema).optional(),
  none: z.lazy(() => ChatMessageActionWhereInputSchema).optional()
}).strict();

export const ConversationRelationFilterSchema: z.ZodType<Prisma.ConversationRelationFilter> = z.object({
  is: z.lazy(() => ConversationWhereInputSchema).optional(),
  isNot: z.lazy(() => ConversationWhereInputSchema).optional()
}).strict();

export const ChatMessageActionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ChatMessageActionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChatMessageId2CompoundUniqueInputSchema: z.ZodType<Prisma.ChatMessageId2CompoundUniqueInput> = z.object({
  conversationId: z.string(),
  shortId: z.string()
}).strict();

export const ChatMessageCountOrderByAggregateInputSchema: z.ZodType<Prisma.ChatMessageCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  format: z.lazy(() => SortOrderSchema).optional(),
  conversationId: z.lazy(() => SortOrderSchema).optional(),
  shortId: z.lazy(() => SortOrderSchema).optional(),
  namespace: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChatMessageMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ChatMessageMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  format: z.lazy(() => SortOrderSchema).optional(),
  conversationId: z.lazy(() => SortOrderSchema).optional(),
  shortId: z.lazy(() => SortOrderSchema).optional(),
  namespace: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChatMessageMinOrderByAggregateInputSchema: z.ZodType<Prisma.ChatMessageMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  format: z.lazy(() => SortOrderSchema).optional(),
  conversationId: z.lazy(() => SortOrderSchema).optional(),
  shortId: z.lazy(() => SortOrderSchema).optional(),
  namespace: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumPromptRoleTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumPromptRoleTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PromptRoleTypeSchema).optional(),
  in: z.lazy(() => PromptRoleTypeSchema).array().optional(),
  notIn: z.lazy(() => PromptRoleTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => PromptRoleTypeSchema),z.lazy(() => NestedEnumPromptRoleTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPromptRoleTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPromptRoleTypeFilterSchema).optional()
}).strict();

export const EnumChatMessageFormatTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumChatMessageFormatTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ChatMessageFormatTypeSchema).optional(),
  in: z.lazy(() => ChatMessageFormatTypeSchema).array().optional(),
  notIn: z.lazy(() => ChatMessageFormatTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ChatMessageFormatTypeSchema),z.lazy(() => NestedEnumChatMessageFormatTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumChatMessageFormatTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumChatMessageFormatTypeFilterSchema).optional()
}).strict();

export const ChatMessageRelationFilterSchema: z.ZodType<Prisma.ChatMessageRelationFilter> = z.object({
  is: z.lazy(() => ChatMessageWhereInputSchema).optional(),
  isNot: z.lazy(() => ChatMessageWhereInputSchema).optional()
}).strict();

export const ChatMessageActionCountOrderByAggregateInputSchema: z.ZodType<Prisma.ChatMessageActionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  messageId: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChatMessageActionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ChatMessageActionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  messageId: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChatMessageActionMinOrderByAggregateInputSchema: z.ZodType<Prisma.ChatMessageActionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  messageId: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChatMessageListRelationFilterSchema: z.ZodType<Prisma.ChatMessageListRelationFilter> = z.object({
  every: z.lazy(() => ChatMessageWhereInputSchema).optional(),
  some: z.lazy(() => ChatMessageWhereInputSchema).optional(),
  none: z.lazy(() => ChatMessageWhereInputSchema).optional()
}).strict();

export const ChatMessageOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ChatMessageOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ConversationConversationCompoundUniqueInputSchema: z.ZodType<Prisma.ConversationConversationCompoundUniqueInput> = z.object({
  userId: z.string(),
  appId: z.string()
}).strict();

export const ConversationCountOrderByAggregateInputSchema: z.ZodType<Prisma.ConversationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  appId: z.lazy(() => SortOrderSchema).optional(),
  pinned: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ConversationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ConversationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  appId: z.lazy(() => SortOrderSchema).optional(),
  pinned: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ConversationMinOrderByAggregateInputSchema: z.ZodType<Prisma.ConversationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  appId: z.lazy(() => SortOrderSchema).optional(),
  pinned: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FollowRelationCountOrderByAggregateInputSchema: z.ZodType<Prisma.FollowRelationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fromId: z.lazy(() => SortOrderSchema).optional(),
  toId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FollowRelationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FollowRelationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fromId: z.lazy(() => SortOrderSchema).optional(),
  toId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FollowRelationMinOrderByAggregateInputSchema: z.ZodType<Prisma.FollowRelationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fromId: z.lazy(() => SortOrderSchema).optional(),
  toId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumInvitationStatusFilterSchema: z.ZodType<Prisma.EnumInvitationStatusFilter> = z.object({
  equals: z.lazy(() => InvitationStatusSchema).optional(),
  in: z.lazy(() => InvitationStatusSchema).array().optional(),
  notIn: z.lazy(() => InvitationStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => InvitationStatusSchema),z.lazy(() => NestedEnumInvitationStatusFilterSchema) ]).optional(),
}).strict();

export const InvitationRelationCountOrderByAggregateInputSchema: z.ZodType<Prisma.InvitationRelationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  fromId: z.lazy(() => SortOrderSchema).optional(),
  toId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InvitationRelationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.InvitationRelationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  fromId: z.lazy(() => SortOrderSchema).optional(),
  toId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InvitationRelationMinOrderByAggregateInputSchema: z.ZodType<Prisma.InvitationRelationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  fromId: z.lazy(() => SortOrderSchema).optional(),
  toId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumInvitationStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumInvitationStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => InvitationStatusSchema).optional(),
  in: z.lazy(() => InvitationStatusSchema).array().optional(),
  notIn: z.lazy(() => InvitationStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => InvitationStatusSchema),z.lazy(() => NestedEnumInvitationStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumInvitationStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumInvitationStatusFilterSchema).optional()
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StarringAppCountOrderByAggregateInputSchema: z.ZodType<Prisma.StarringAppCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  appId: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StarringAppMaxOrderByAggregateInputSchema: z.ZodType<Prisma.StarringAppMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  appId: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StarringAppMinOrderByAggregateInputSchema: z.ZodType<Prisma.StarringAppMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  appId: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TranscationCountOrderByAggregateInputSchema: z.ZodType<Prisma.TranscationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TranscationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TranscationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TranscationMinOrderByAggregateInputSchema: z.ZodType<Prisma.TranscationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> = z.object({
  every: z.lazy(() => AccountWhereInputSchema).optional(),
  some: z.lazy(() => AccountWhereInputSchema).optional(),
  none: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const InvitationRelationListRelationFilterSchema: z.ZodType<Prisma.InvitationRelationListRelationFilter> = z.object({
  every: z.lazy(() => InvitationRelationWhereInputSchema).optional(),
  some: z.lazy(() => InvitationRelationWhereInputSchema).optional(),
  none: z.lazy(() => InvitationRelationWhereInputSchema).optional()
}).strict();

export const FollowRelationListRelationFilterSchema: z.ZodType<Prisma.FollowRelationListRelationFilter> = z.object({
  every: z.lazy(() => FollowRelationWhereInputSchema).optional(),
  some: z.lazy(() => FollowRelationWhereInputSchema).optional(),
  none: z.lazy(() => FollowRelationWhereInputSchema).optional()
}).strict();

export const TranscationListRelationFilterSchema: z.ZodType<Prisma.TranscationListRelationFilter> = z.object({
  every: z.lazy(() => TranscationWhereInputSchema).optional(),
  some: z.lazy(() => TranscationWhereInputSchema).optional(),
  none: z.lazy(() => TranscationWhereInputSchema).optional()
}).strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InvitationRelationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.InvitationRelationOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FollowRelationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FollowRelationOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TranscationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TranscationOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserPlatformCompoundUniqueInputSchema: z.ZodType<Prisma.UserPlatformCompoundUniqueInput> = z.object({
  platformType: z.lazy(() => PlatformTypeSchema),
  platformId: z.string()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  platformType: z.lazy(() => SortOrderSchema).optional(),
  platformId: z.lazy(() => SortOrderSchema).optional(),
  platformArgs: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  balance: z.lazy(() => SortOrderSchema).optional(),
  followedByCount: z.lazy(() => SortOrderSchema).optional(),
  followingCount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> = z.object({
  balance: z.lazy(() => SortOrderSchema).optional(),
  followedByCount: z.lazy(() => SortOrderSchema).optional(),
  followingCount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  platformType: z.lazy(() => SortOrderSchema).optional(),
  platformId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  balance: z.lazy(() => SortOrderSchema).optional(),
  followedByCount: z.lazy(() => SortOrderSchema).optional(),
  followingCount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  platformType: z.lazy(() => SortOrderSchema).optional(),
  platformId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  balance: z.lazy(() => SortOrderSchema).optional(),
  followedByCount: z.lazy(() => SortOrderSchema).optional(),
  followingCount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = z.object({
  balance: z.lazy(() => SortOrderSchema).optional(),
  followedByCount: z.lazy(() => SortOrderSchema).optional(),
  followingCount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenIdentifierTokenCompoundUniqueInputSchema: z.ZodType<Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput> = z.object({
  identifier: z.string(),
  token: z.string()
}).strict();

export const VerificationTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenCountOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMaxOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAccountsInputSchema),z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutCreatedAppsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCreatedAppsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedAppsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedAppsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCreatedAppsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const AppTagCreateNestedManyWithoutAppsInputSchema: z.ZodType<Prisma.AppTagCreateNestedManyWithoutAppsInput> = z.object({
  create: z.union([ z.lazy(() => AppTagCreateWithoutAppsInputSchema),z.lazy(() => AppTagCreateWithoutAppsInputSchema).array(),z.lazy(() => AppTagUncheckedCreateWithoutAppsInputSchema),z.lazy(() => AppTagUncheckedCreateWithoutAppsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppTagCreateOrConnectWithoutAppsInputSchema),z.lazy(() => AppTagCreateOrConnectWithoutAppsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppTagWhereUniqueInputSchema),z.lazy(() => AppTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AppCategoryCreateNestedOneWithoutAppInputSchema: z.ZodType<Prisma.AppCategoryCreateNestedOneWithoutAppInput> = z.object({
  create: z.union([ z.lazy(() => AppCategoryCreateWithoutAppInputSchema),z.lazy(() => AppCategoryUncheckedCreateWithoutAppInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AppCategoryCreateOrConnectWithoutAppInputSchema).optional(),
  connect: z.lazy(() => AppCategoryWhereUniqueInputSchema).optional()
}).strict();

export const AppActionCreateNestedManyWithoutAppInputSchema: z.ZodType<Prisma.AppActionCreateNestedManyWithoutAppInput> = z.object({
  create: z.union([ z.lazy(() => AppActionCreateWithoutAppInputSchema),z.lazy(() => AppActionCreateWithoutAppInputSchema).array(),z.lazy(() => AppActionUncheckedCreateWithoutAppInputSchema),z.lazy(() => AppActionUncheckedCreateWithoutAppInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppActionCreateOrConnectWithoutAppInputSchema),z.lazy(() => AppActionCreateOrConnectWithoutAppInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppActionCreateManyAppInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AppActionWhereUniqueInputSchema),z.lazy(() => AppActionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ConversationCreateNestedManyWithoutAppInputSchema: z.ZodType<Prisma.ConversationCreateNestedManyWithoutAppInput> = z.object({
  create: z.union([ z.lazy(() => ConversationCreateWithoutAppInputSchema),z.lazy(() => ConversationCreateWithoutAppInputSchema).array(),z.lazy(() => ConversationUncheckedCreateWithoutAppInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutAppInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConversationCreateOrConnectWithoutAppInputSchema),z.lazy(() => ConversationCreateOrConnectWithoutAppInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConversationCreateManyAppInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StarringAppCreateNestedManyWithoutAppInputSchema: z.ZodType<Prisma.StarringAppCreateNestedManyWithoutAppInput> = z.object({
  create: z.union([ z.lazy(() => StarringAppCreateWithoutAppInputSchema),z.lazy(() => StarringAppCreateWithoutAppInputSchema).array(),z.lazy(() => StarringAppUncheckedCreateWithoutAppInputSchema),z.lazy(() => StarringAppUncheckedCreateWithoutAppInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StarringAppCreateOrConnectWithoutAppInputSchema),z.lazy(() => StarringAppCreateOrConnectWithoutAppInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StarringAppCreateManyAppInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StarringAppWhereUniqueInputSchema),z.lazy(() => StarringAppWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AppCommentCreateNestedManyWithoutAAppInputSchema: z.ZodType<Prisma.AppCommentCreateNestedManyWithoutAAppInput> = z.object({
  create: z.union([ z.lazy(() => AppCommentCreateWithoutAAppInputSchema),z.lazy(() => AppCommentCreateWithoutAAppInputSchema).array(),z.lazy(() => AppCommentUncheckedCreateWithoutAAppInputSchema),z.lazy(() => AppCommentUncheckedCreateWithoutAAppInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppCommentCreateOrConnectWithoutAAppInputSchema),z.lazy(() => AppCommentCreateOrConnectWithoutAAppInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppCommentCreateManyAAppInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AppCommentWhereUniqueInputSchema),z.lazy(() => AppCommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AppStateCreateNestedOneWithoutAppInputSchema: z.ZodType<Prisma.AppStateCreateNestedOneWithoutAppInput> = z.object({
  create: z.union([ z.lazy(() => AppStateCreateWithoutAppInputSchema),z.lazy(() => AppStateUncheckedCreateWithoutAppInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AppStateCreateOrConnectWithoutAppInputSchema).optional(),
  connect: z.lazy(() => AppStateWhereUniqueInputSchema).optional()
}).strict();

export const AppTagUncheckedCreateNestedManyWithoutAppsInputSchema: z.ZodType<Prisma.AppTagUncheckedCreateNestedManyWithoutAppsInput> = z.object({
  create: z.union([ z.lazy(() => AppTagCreateWithoutAppsInputSchema),z.lazy(() => AppTagCreateWithoutAppsInputSchema).array(),z.lazy(() => AppTagUncheckedCreateWithoutAppsInputSchema),z.lazy(() => AppTagUncheckedCreateWithoutAppsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppTagCreateOrConnectWithoutAppsInputSchema),z.lazy(() => AppTagCreateOrConnectWithoutAppsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppTagWhereUniqueInputSchema),z.lazy(() => AppTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AppActionUncheckedCreateNestedManyWithoutAppInputSchema: z.ZodType<Prisma.AppActionUncheckedCreateNestedManyWithoutAppInput> = z.object({
  create: z.union([ z.lazy(() => AppActionCreateWithoutAppInputSchema),z.lazy(() => AppActionCreateWithoutAppInputSchema).array(),z.lazy(() => AppActionUncheckedCreateWithoutAppInputSchema),z.lazy(() => AppActionUncheckedCreateWithoutAppInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppActionCreateOrConnectWithoutAppInputSchema),z.lazy(() => AppActionCreateOrConnectWithoutAppInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppActionCreateManyAppInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AppActionWhereUniqueInputSchema),z.lazy(() => AppActionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ConversationUncheckedCreateNestedManyWithoutAppInputSchema: z.ZodType<Prisma.ConversationUncheckedCreateNestedManyWithoutAppInput> = z.object({
  create: z.union([ z.lazy(() => ConversationCreateWithoutAppInputSchema),z.lazy(() => ConversationCreateWithoutAppInputSchema).array(),z.lazy(() => ConversationUncheckedCreateWithoutAppInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutAppInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConversationCreateOrConnectWithoutAppInputSchema),z.lazy(() => ConversationCreateOrConnectWithoutAppInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConversationCreateManyAppInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StarringAppUncheckedCreateNestedManyWithoutAppInputSchema: z.ZodType<Prisma.StarringAppUncheckedCreateNestedManyWithoutAppInput> = z.object({
  create: z.union([ z.lazy(() => StarringAppCreateWithoutAppInputSchema),z.lazy(() => StarringAppCreateWithoutAppInputSchema).array(),z.lazy(() => StarringAppUncheckedCreateWithoutAppInputSchema),z.lazy(() => StarringAppUncheckedCreateWithoutAppInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StarringAppCreateOrConnectWithoutAppInputSchema),z.lazy(() => StarringAppCreateOrConnectWithoutAppInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StarringAppCreateManyAppInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StarringAppWhereUniqueInputSchema),z.lazy(() => StarringAppWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AppCommentUncheckedCreateNestedManyWithoutAAppInputSchema: z.ZodType<Prisma.AppCommentUncheckedCreateNestedManyWithoutAAppInput> = z.object({
  create: z.union([ z.lazy(() => AppCommentCreateWithoutAAppInputSchema),z.lazy(() => AppCommentCreateWithoutAAppInputSchema).array(),z.lazy(() => AppCommentUncheckedCreateWithoutAAppInputSchema),z.lazy(() => AppCommentUncheckedCreateWithoutAAppInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppCommentCreateOrConnectWithoutAAppInputSchema),z.lazy(() => AppCommentCreateOrConnectWithoutAAppInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppCommentCreateManyAAppInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AppCommentWhereUniqueInputSchema),z.lazy(() => AppCommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AppStateUncheckedCreateNestedOneWithoutAppInputSchema: z.ZodType<Prisma.AppStateUncheckedCreateNestedOneWithoutAppInput> = z.object({
  create: z.union([ z.lazy(() => AppStateCreateWithoutAppInputSchema),z.lazy(() => AppStateUncheckedCreateWithoutAppInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AppStateCreateOrConnectWithoutAppInputSchema).optional(),
  connect: z.lazy(() => AppStateWhereUniqueInputSchema).optional()
}).strict();

export const EnumPlatformTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumPlatformTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => PlatformTypeSchema).optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const UserUpdateOneRequiredWithoutCreatedAppsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCreatedAppsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedAppsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedAppsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCreatedAppsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCreatedAppsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutCreatedAppsInputSchema),z.lazy(() => UserUpdateWithoutCreatedAppsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCreatedAppsInputSchema) ]).optional(),
}).strict();

export const AppTagUpdateManyWithoutAppsNestedInputSchema: z.ZodType<Prisma.AppTagUpdateManyWithoutAppsNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppTagCreateWithoutAppsInputSchema),z.lazy(() => AppTagCreateWithoutAppsInputSchema).array(),z.lazy(() => AppTagUncheckedCreateWithoutAppsInputSchema),z.lazy(() => AppTagUncheckedCreateWithoutAppsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppTagCreateOrConnectWithoutAppsInputSchema),z.lazy(() => AppTagCreateOrConnectWithoutAppsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppTagUpsertWithWhereUniqueWithoutAppsInputSchema),z.lazy(() => AppTagUpsertWithWhereUniqueWithoutAppsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => AppTagWhereUniqueInputSchema),z.lazy(() => AppTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppTagWhereUniqueInputSchema),z.lazy(() => AppTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppTagWhereUniqueInputSchema),z.lazy(() => AppTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppTagWhereUniqueInputSchema),z.lazy(() => AppTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppTagUpdateWithWhereUniqueWithoutAppsInputSchema),z.lazy(() => AppTagUpdateWithWhereUniqueWithoutAppsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppTagUpdateManyWithWhereWithoutAppsInputSchema),z.lazy(() => AppTagUpdateManyWithWhereWithoutAppsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppTagScalarWhereInputSchema),z.lazy(() => AppTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AppCategoryUpdateOneRequiredWithoutAppNestedInputSchema: z.ZodType<Prisma.AppCategoryUpdateOneRequiredWithoutAppNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppCategoryCreateWithoutAppInputSchema),z.lazy(() => AppCategoryUncheckedCreateWithoutAppInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AppCategoryCreateOrConnectWithoutAppInputSchema).optional(),
  upsert: z.lazy(() => AppCategoryUpsertWithoutAppInputSchema).optional(),
  connect: z.lazy(() => AppCategoryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AppCategoryUpdateToOneWithWhereWithoutAppInputSchema),z.lazy(() => AppCategoryUpdateWithoutAppInputSchema),z.lazy(() => AppCategoryUncheckedUpdateWithoutAppInputSchema) ]).optional(),
}).strict();

export const AppActionUpdateManyWithoutAppNestedInputSchema: z.ZodType<Prisma.AppActionUpdateManyWithoutAppNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppActionCreateWithoutAppInputSchema),z.lazy(() => AppActionCreateWithoutAppInputSchema).array(),z.lazy(() => AppActionUncheckedCreateWithoutAppInputSchema),z.lazy(() => AppActionUncheckedCreateWithoutAppInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppActionCreateOrConnectWithoutAppInputSchema),z.lazy(() => AppActionCreateOrConnectWithoutAppInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppActionUpsertWithWhereUniqueWithoutAppInputSchema),z.lazy(() => AppActionUpsertWithWhereUniqueWithoutAppInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppActionCreateManyAppInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AppActionWhereUniqueInputSchema),z.lazy(() => AppActionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppActionWhereUniqueInputSchema),z.lazy(() => AppActionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppActionWhereUniqueInputSchema),z.lazy(() => AppActionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppActionWhereUniqueInputSchema),z.lazy(() => AppActionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppActionUpdateWithWhereUniqueWithoutAppInputSchema),z.lazy(() => AppActionUpdateWithWhereUniqueWithoutAppInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppActionUpdateManyWithWhereWithoutAppInputSchema),z.lazy(() => AppActionUpdateManyWithWhereWithoutAppInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppActionScalarWhereInputSchema),z.lazy(() => AppActionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ConversationUpdateManyWithoutAppNestedInputSchema: z.ZodType<Prisma.ConversationUpdateManyWithoutAppNestedInput> = z.object({
  create: z.union([ z.lazy(() => ConversationCreateWithoutAppInputSchema),z.lazy(() => ConversationCreateWithoutAppInputSchema).array(),z.lazy(() => ConversationUncheckedCreateWithoutAppInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutAppInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConversationCreateOrConnectWithoutAppInputSchema),z.lazy(() => ConversationCreateOrConnectWithoutAppInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ConversationUpsertWithWhereUniqueWithoutAppInputSchema),z.lazy(() => ConversationUpsertWithWhereUniqueWithoutAppInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConversationCreateManyAppInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ConversationUpdateWithWhereUniqueWithoutAppInputSchema),z.lazy(() => ConversationUpdateWithWhereUniqueWithoutAppInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ConversationUpdateManyWithWhereWithoutAppInputSchema),z.lazy(() => ConversationUpdateManyWithWhereWithoutAppInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ConversationScalarWhereInputSchema),z.lazy(() => ConversationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StarringAppUpdateManyWithoutAppNestedInputSchema: z.ZodType<Prisma.StarringAppUpdateManyWithoutAppNestedInput> = z.object({
  create: z.union([ z.lazy(() => StarringAppCreateWithoutAppInputSchema),z.lazy(() => StarringAppCreateWithoutAppInputSchema).array(),z.lazy(() => StarringAppUncheckedCreateWithoutAppInputSchema),z.lazy(() => StarringAppUncheckedCreateWithoutAppInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StarringAppCreateOrConnectWithoutAppInputSchema),z.lazy(() => StarringAppCreateOrConnectWithoutAppInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StarringAppUpsertWithWhereUniqueWithoutAppInputSchema),z.lazy(() => StarringAppUpsertWithWhereUniqueWithoutAppInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StarringAppCreateManyAppInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StarringAppWhereUniqueInputSchema),z.lazy(() => StarringAppWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StarringAppWhereUniqueInputSchema),z.lazy(() => StarringAppWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StarringAppWhereUniqueInputSchema),z.lazy(() => StarringAppWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StarringAppWhereUniqueInputSchema),z.lazy(() => StarringAppWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StarringAppUpdateWithWhereUniqueWithoutAppInputSchema),z.lazy(() => StarringAppUpdateWithWhereUniqueWithoutAppInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StarringAppUpdateManyWithWhereWithoutAppInputSchema),z.lazy(() => StarringAppUpdateManyWithWhereWithoutAppInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StarringAppScalarWhereInputSchema),z.lazy(() => StarringAppScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AppCommentUpdateManyWithoutAAppNestedInputSchema: z.ZodType<Prisma.AppCommentUpdateManyWithoutAAppNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppCommentCreateWithoutAAppInputSchema),z.lazy(() => AppCommentCreateWithoutAAppInputSchema).array(),z.lazy(() => AppCommentUncheckedCreateWithoutAAppInputSchema),z.lazy(() => AppCommentUncheckedCreateWithoutAAppInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppCommentCreateOrConnectWithoutAAppInputSchema),z.lazy(() => AppCommentCreateOrConnectWithoutAAppInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppCommentUpsertWithWhereUniqueWithoutAAppInputSchema),z.lazy(() => AppCommentUpsertWithWhereUniqueWithoutAAppInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppCommentCreateManyAAppInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AppCommentWhereUniqueInputSchema),z.lazy(() => AppCommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppCommentWhereUniqueInputSchema),z.lazy(() => AppCommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppCommentWhereUniqueInputSchema),z.lazy(() => AppCommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppCommentWhereUniqueInputSchema),z.lazy(() => AppCommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppCommentUpdateWithWhereUniqueWithoutAAppInputSchema),z.lazy(() => AppCommentUpdateWithWhereUniqueWithoutAAppInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppCommentUpdateManyWithWhereWithoutAAppInputSchema),z.lazy(() => AppCommentUpdateManyWithWhereWithoutAAppInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppCommentScalarWhereInputSchema),z.lazy(() => AppCommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AppStateUpdateOneWithoutAppNestedInputSchema: z.ZodType<Prisma.AppStateUpdateOneWithoutAppNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppStateCreateWithoutAppInputSchema),z.lazy(() => AppStateUncheckedCreateWithoutAppInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AppStateCreateOrConnectWithoutAppInputSchema).optional(),
  upsert: z.lazy(() => AppStateUpsertWithoutAppInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => AppStateWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => AppStateWhereInputSchema) ]).optional(),
  connect: z.lazy(() => AppStateWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AppStateUpdateToOneWithWhereWithoutAppInputSchema),z.lazy(() => AppStateUpdateWithoutAppInputSchema),z.lazy(() => AppStateUncheckedUpdateWithoutAppInputSchema) ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const AppTagUncheckedUpdateManyWithoutAppsNestedInputSchema: z.ZodType<Prisma.AppTagUncheckedUpdateManyWithoutAppsNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppTagCreateWithoutAppsInputSchema),z.lazy(() => AppTagCreateWithoutAppsInputSchema).array(),z.lazy(() => AppTagUncheckedCreateWithoutAppsInputSchema),z.lazy(() => AppTagUncheckedCreateWithoutAppsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppTagCreateOrConnectWithoutAppsInputSchema),z.lazy(() => AppTagCreateOrConnectWithoutAppsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppTagUpsertWithWhereUniqueWithoutAppsInputSchema),z.lazy(() => AppTagUpsertWithWhereUniqueWithoutAppsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => AppTagWhereUniqueInputSchema),z.lazy(() => AppTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppTagWhereUniqueInputSchema),z.lazy(() => AppTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppTagWhereUniqueInputSchema),z.lazy(() => AppTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppTagWhereUniqueInputSchema),z.lazy(() => AppTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppTagUpdateWithWhereUniqueWithoutAppsInputSchema),z.lazy(() => AppTagUpdateWithWhereUniqueWithoutAppsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppTagUpdateManyWithWhereWithoutAppsInputSchema),z.lazy(() => AppTagUpdateManyWithWhereWithoutAppsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppTagScalarWhereInputSchema),z.lazy(() => AppTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AppActionUncheckedUpdateManyWithoutAppNestedInputSchema: z.ZodType<Prisma.AppActionUncheckedUpdateManyWithoutAppNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppActionCreateWithoutAppInputSchema),z.lazy(() => AppActionCreateWithoutAppInputSchema).array(),z.lazy(() => AppActionUncheckedCreateWithoutAppInputSchema),z.lazy(() => AppActionUncheckedCreateWithoutAppInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppActionCreateOrConnectWithoutAppInputSchema),z.lazy(() => AppActionCreateOrConnectWithoutAppInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppActionUpsertWithWhereUniqueWithoutAppInputSchema),z.lazy(() => AppActionUpsertWithWhereUniqueWithoutAppInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppActionCreateManyAppInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AppActionWhereUniqueInputSchema),z.lazy(() => AppActionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppActionWhereUniqueInputSchema),z.lazy(() => AppActionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppActionWhereUniqueInputSchema),z.lazy(() => AppActionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppActionWhereUniqueInputSchema),z.lazy(() => AppActionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppActionUpdateWithWhereUniqueWithoutAppInputSchema),z.lazy(() => AppActionUpdateWithWhereUniqueWithoutAppInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppActionUpdateManyWithWhereWithoutAppInputSchema),z.lazy(() => AppActionUpdateManyWithWhereWithoutAppInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppActionScalarWhereInputSchema),z.lazy(() => AppActionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ConversationUncheckedUpdateManyWithoutAppNestedInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateManyWithoutAppNestedInput> = z.object({
  create: z.union([ z.lazy(() => ConversationCreateWithoutAppInputSchema),z.lazy(() => ConversationCreateWithoutAppInputSchema).array(),z.lazy(() => ConversationUncheckedCreateWithoutAppInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutAppInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConversationCreateOrConnectWithoutAppInputSchema),z.lazy(() => ConversationCreateOrConnectWithoutAppInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ConversationUpsertWithWhereUniqueWithoutAppInputSchema),z.lazy(() => ConversationUpsertWithWhereUniqueWithoutAppInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConversationCreateManyAppInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ConversationUpdateWithWhereUniqueWithoutAppInputSchema),z.lazy(() => ConversationUpdateWithWhereUniqueWithoutAppInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ConversationUpdateManyWithWhereWithoutAppInputSchema),z.lazy(() => ConversationUpdateManyWithWhereWithoutAppInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ConversationScalarWhereInputSchema),z.lazy(() => ConversationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StarringAppUncheckedUpdateManyWithoutAppNestedInputSchema: z.ZodType<Prisma.StarringAppUncheckedUpdateManyWithoutAppNestedInput> = z.object({
  create: z.union([ z.lazy(() => StarringAppCreateWithoutAppInputSchema),z.lazy(() => StarringAppCreateWithoutAppInputSchema).array(),z.lazy(() => StarringAppUncheckedCreateWithoutAppInputSchema),z.lazy(() => StarringAppUncheckedCreateWithoutAppInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StarringAppCreateOrConnectWithoutAppInputSchema),z.lazy(() => StarringAppCreateOrConnectWithoutAppInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StarringAppUpsertWithWhereUniqueWithoutAppInputSchema),z.lazy(() => StarringAppUpsertWithWhereUniqueWithoutAppInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StarringAppCreateManyAppInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StarringAppWhereUniqueInputSchema),z.lazy(() => StarringAppWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StarringAppWhereUniqueInputSchema),z.lazy(() => StarringAppWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StarringAppWhereUniqueInputSchema),z.lazy(() => StarringAppWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StarringAppWhereUniqueInputSchema),z.lazy(() => StarringAppWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StarringAppUpdateWithWhereUniqueWithoutAppInputSchema),z.lazy(() => StarringAppUpdateWithWhereUniqueWithoutAppInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StarringAppUpdateManyWithWhereWithoutAppInputSchema),z.lazy(() => StarringAppUpdateManyWithWhereWithoutAppInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StarringAppScalarWhereInputSchema),z.lazy(() => StarringAppScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AppCommentUncheckedUpdateManyWithoutAAppNestedInputSchema: z.ZodType<Prisma.AppCommentUncheckedUpdateManyWithoutAAppNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppCommentCreateWithoutAAppInputSchema),z.lazy(() => AppCommentCreateWithoutAAppInputSchema).array(),z.lazy(() => AppCommentUncheckedCreateWithoutAAppInputSchema),z.lazy(() => AppCommentUncheckedCreateWithoutAAppInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppCommentCreateOrConnectWithoutAAppInputSchema),z.lazy(() => AppCommentCreateOrConnectWithoutAAppInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppCommentUpsertWithWhereUniqueWithoutAAppInputSchema),z.lazy(() => AppCommentUpsertWithWhereUniqueWithoutAAppInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppCommentCreateManyAAppInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AppCommentWhereUniqueInputSchema),z.lazy(() => AppCommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppCommentWhereUniqueInputSchema),z.lazy(() => AppCommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppCommentWhereUniqueInputSchema),z.lazy(() => AppCommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppCommentWhereUniqueInputSchema),z.lazy(() => AppCommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppCommentUpdateWithWhereUniqueWithoutAAppInputSchema),z.lazy(() => AppCommentUpdateWithWhereUniqueWithoutAAppInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppCommentUpdateManyWithWhereWithoutAAppInputSchema),z.lazy(() => AppCommentUpdateManyWithWhereWithoutAAppInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppCommentScalarWhereInputSchema),z.lazy(() => AppCommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AppStateUncheckedUpdateOneWithoutAppNestedInputSchema: z.ZodType<Prisma.AppStateUncheckedUpdateOneWithoutAppNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppStateCreateWithoutAppInputSchema),z.lazy(() => AppStateUncheckedCreateWithoutAppInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AppStateCreateOrConnectWithoutAppInputSchema).optional(),
  upsert: z.lazy(() => AppStateUpsertWithoutAppInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => AppStateWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => AppStateWhereInputSchema) ]).optional(),
  connect: z.lazy(() => AppStateWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AppStateUpdateToOneWithWhereWithoutAppInputSchema),z.lazy(() => AppStateUpdateWithoutAppInputSchema),z.lazy(() => AppStateUncheckedUpdateWithoutAppInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutAppActionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAppActionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAppActionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAppActionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAppActionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const AppCreateNestedOneWithoutActionsInputSchema: z.ZodType<Prisma.AppCreateNestedOneWithoutActionsInput> = z.object({
  create: z.union([ z.lazy(() => AppCreateWithoutActionsInputSchema),z.lazy(() => AppUncheckedCreateWithoutActionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AppCreateOrConnectWithoutActionsInputSchema).optional(),
  connect: z.lazy(() => AppWhereUniqueInputSchema).optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const UserUpdateOneWithoutAppActionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutAppActionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAppActionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAppActionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAppActionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAppActionsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAppActionsInputSchema),z.lazy(() => UserUpdateWithoutAppActionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAppActionsInputSchema) ]).optional(),
}).strict();

export const AppUpdateOneRequiredWithoutActionsNestedInputSchema: z.ZodType<Prisma.AppUpdateOneRequiredWithoutActionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppCreateWithoutActionsInputSchema),z.lazy(() => AppUncheckedCreateWithoutActionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AppCreateOrConnectWithoutActionsInputSchema).optional(),
  upsert: z.lazy(() => AppUpsertWithoutActionsInputSchema).optional(),
  connect: z.lazy(() => AppWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AppUpdateToOneWithWhereWithoutActionsInputSchema),z.lazy(() => AppUpdateWithoutActionsInputSchema),z.lazy(() => AppUncheckedUpdateWithoutActionsInputSchema) ]).optional(),
}).strict();

export const AppCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.AppCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => AppCreateWithoutCategoryInputSchema),z.lazy(() => AppCreateWithoutCategoryInputSchema).array(),z.lazy(() => AppUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => AppUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => AppCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AppUncheckedCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.AppUncheckedCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => AppCreateWithoutCategoryInputSchema),z.lazy(() => AppCreateWithoutCategoryInputSchema).array(),z.lazy(() => AppUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => AppUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => AppCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AppUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.AppUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppCreateWithoutCategoryInputSchema),z.lazy(() => AppCreateWithoutCategoryInputSchema).array(),z.lazy(() => AppUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => AppUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => AppCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => AppUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => AppUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => AppUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppScalarWhereInputSchema),z.lazy(() => AppScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AppUncheckedUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.AppUncheckedUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppCreateWithoutCategoryInputSchema),z.lazy(() => AppCreateWithoutCategoryInputSchema).array(),z.lazy(() => AppUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => AppUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => AppCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => AppUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => AppUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => AppUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppScalarWhereInputSchema),z.lazy(() => AppScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutAppCommentsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAppCommentsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAppCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAppCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAppCommentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const AppCreateNestedOneWithoutCommentsInputSchema: z.ZodType<Prisma.AppCreateNestedOneWithoutCommentsInput> = z.object({
  create: z.union([ z.lazy(() => AppCreateWithoutCommentsInputSchema),z.lazy(() => AppUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AppCreateOrConnectWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => AppWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutAppCommentsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAppCommentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAppCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAppCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAppCommentsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAppCommentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAppCommentsInputSchema),z.lazy(() => UserUpdateWithoutAppCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAppCommentsInputSchema) ]).optional(),
}).strict();

export const AppUpdateOneRequiredWithoutCommentsNestedInputSchema: z.ZodType<Prisma.AppUpdateOneRequiredWithoutCommentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppCreateWithoutCommentsInputSchema),z.lazy(() => AppUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AppCreateOrConnectWithoutCommentsInputSchema).optional(),
  upsert: z.lazy(() => AppUpsertWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => AppWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AppUpdateToOneWithWhereWithoutCommentsInputSchema),z.lazy(() => AppUpdateWithoutCommentsInputSchema),z.lazy(() => AppUncheckedUpdateWithoutCommentsInputSchema) ]).optional(),
}).strict();

export const AppCreateNestedOneWithoutStateInputSchema: z.ZodType<Prisma.AppCreateNestedOneWithoutStateInput> = z.object({
  create: z.union([ z.lazy(() => AppCreateWithoutStateInputSchema),z.lazy(() => AppUncheckedCreateWithoutStateInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AppCreateOrConnectWithoutStateInputSchema).optional(),
  connect: z.lazy(() => AppWhereUniqueInputSchema).optional()
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const AppUpdateOneRequiredWithoutStateNestedInputSchema: z.ZodType<Prisma.AppUpdateOneRequiredWithoutStateNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppCreateWithoutStateInputSchema),z.lazy(() => AppUncheckedCreateWithoutStateInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AppCreateOrConnectWithoutStateInputSchema).optional(),
  upsert: z.lazy(() => AppUpsertWithoutStateInputSchema).optional(),
  connect: z.lazy(() => AppWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AppUpdateToOneWithWhereWithoutStateInputSchema),z.lazy(() => AppUpdateWithoutStateInputSchema),z.lazy(() => AppUncheckedUpdateWithoutStateInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutTagsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutTagsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTagsInputSchema),z.lazy(() => UserUncheckedCreateWithoutTagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTagsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const AppCreateNestedManyWithoutTagsInputSchema: z.ZodType<Prisma.AppCreateNestedManyWithoutTagsInput> = z.object({
  create: z.union([ z.lazy(() => AppCreateWithoutTagsInputSchema),z.lazy(() => AppCreateWithoutTagsInputSchema).array(),z.lazy(() => AppUncheckedCreateWithoutTagsInputSchema),z.lazy(() => AppUncheckedCreateWithoutTagsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppCreateOrConnectWithoutTagsInputSchema),z.lazy(() => AppCreateOrConnectWithoutTagsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AppUncheckedCreateNestedManyWithoutTagsInputSchema: z.ZodType<Prisma.AppUncheckedCreateNestedManyWithoutTagsInput> = z.object({
  create: z.union([ z.lazy(() => AppCreateWithoutTagsInputSchema),z.lazy(() => AppCreateWithoutTagsInputSchema).array(),z.lazy(() => AppUncheckedCreateWithoutTagsInputSchema),z.lazy(() => AppUncheckedCreateWithoutTagsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppCreateOrConnectWithoutTagsInputSchema),z.lazy(() => AppCreateOrConnectWithoutTagsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneWithoutTagsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutTagsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTagsInputSchema),z.lazy(() => UserUncheckedCreateWithoutTagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTagsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutTagsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutTagsInputSchema),z.lazy(() => UserUpdateWithoutTagsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTagsInputSchema) ]).optional(),
}).strict();

export const AppUpdateManyWithoutTagsNestedInputSchema: z.ZodType<Prisma.AppUpdateManyWithoutTagsNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppCreateWithoutTagsInputSchema),z.lazy(() => AppCreateWithoutTagsInputSchema).array(),z.lazy(() => AppUncheckedCreateWithoutTagsInputSchema),z.lazy(() => AppUncheckedCreateWithoutTagsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppCreateOrConnectWithoutTagsInputSchema),z.lazy(() => AppCreateOrConnectWithoutTagsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppUpsertWithWhereUniqueWithoutTagsInputSchema),z.lazy(() => AppUpsertWithWhereUniqueWithoutTagsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppUpdateWithWhereUniqueWithoutTagsInputSchema),z.lazy(() => AppUpdateWithWhereUniqueWithoutTagsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppUpdateManyWithWhereWithoutTagsInputSchema),z.lazy(() => AppUpdateManyWithWhereWithoutTagsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppScalarWhereInputSchema),z.lazy(() => AppScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AppUncheckedUpdateManyWithoutTagsNestedInputSchema: z.ZodType<Prisma.AppUncheckedUpdateManyWithoutTagsNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppCreateWithoutTagsInputSchema),z.lazy(() => AppCreateWithoutTagsInputSchema).array(),z.lazy(() => AppUncheckedCreateWithoutTagsInputSchema),z.lazy(() => AppUncheckedCreateWithoutTagsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppCreateOrConnectWithoutTagsInputSchema),z.lazy(() => AppCreateOrConnectWithoutTagsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppUpsertWithWhereUniqueWithoutTagsInputSchema),z.lazy(() => AppUpsertWithWhereUniqueWithoutTagsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppUpdateWithWhereUniqueWithoutTagsInputSchema),z.lazy(() => AppUpdateWithWhereUniqueWithoutTagsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppUpdateManyWithWhereWithoutTagsInputSchema),z.lazy(() => AppUpdateManyWithWhereWithoutTagsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppScalarWhereInputSchema),z.lazy(() => AppScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutChatMessagesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutChatMessagesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutChatMessagesInputSchema),z.lazy(() => UserUncheckedCreateWithoutChatMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutChatMessagesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const ChatMessageActionCreateNestedManyWithoutMessageInputSchema: z.ZodType<Prisma.ChatMessageActionCreateNestedManyWithoutMessageInput> = z.object({
  create: z.union([ z.lazy(() => ChatMessageActionCreateWithoutMessageInputSchema),z.lazy(() => ChatMessageActionCreateWithoutMessageInputSchema).array(),z.lazy(() => ChatMessageActionUncheckedCreateWithoutMessageInputSchema),z.lazy(() => ChatMessageActionUncheckedCreateWithoutMessageInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatMessageActionCreateOrConnectWithoutMessageInputSchema),z.lazy(() => ChatMessageActionCreateOrConnectWithoutMessageInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatMessageActionCreateManyMessageInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ChatMessageActionWhereUniqueInputSchema),z.lazy(() => ChatMessageActionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ConversationCreateNestedOneWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationCreateNestedOneWithoutMessagesInput> = z.object({
  create: z.union([ z.lazy(() => ConversationCreateWithoutMessagesInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ConversationCreateOrConnectWithoutMessagesInputSchema).optional(),
  connect: z.lazy(() => ConversationWhereUniqueInputSchema).optional()
}).strict();

export const ChatMessageActionUncheckedCreateNestedManyWithoutMessageInputSchema: z.ZodType<Prisma.ChatMessageActionUncheckedCreateNestedManyWithoutMessageInput> = z.object({
  create: z.union([ z.lazy(() => ChatMessageActionCreateWithoutMessageInputSchema),z.lazy(() => ChatMessageActionCreateWithoutMessageInputSchema).array(),z.lazy(() => ChatMessageActionUncheckedCreateWithoutMessageInputSchema),z.lazy(() => ChatMessageActionUncheckedCreateWithoutMessageInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatMessageActionCreateOrConnectWithoutMessageInputSchema),z.lazy(() => ChatMessageActionCreateOrConnectWithoutMessageInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatMessageActionCreateManyMessageInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ChatMessageActionWhereUniqueInputSchema),z.lazy(() => ChatMessageActionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumPromptRoleTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumPromptRoleTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => PromptRoleTypeSchema).optional()
}).strict();

export const EnumChatMessageFormatTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumChatMessageFormatTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ChatMessageFormatTypeSchema).optional()
}).strict();

export const UserUpdateOneWithoutChatMessagesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutChatMessagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutChatMessagesInputSchema),z.lazy(() => UserUncheckedCreateWithoutChatMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutChatMessagesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutChatMessagesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutChatMessagesInputSchema),z.lazy(() => UserUpdateWithoutChatMessagesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutChatMessagesInputSchema) ]).optional(),
}).strict();

export const ChatMessageActionUpdateManyWithoutMessageNestedInputSchema: z.ZodType<Prisma.ChatMessageActionUpdateManyWithoutMessageNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChatMessageActionCreateWithoutMessageInputSchema),z.lazy(() => ChatMessageActionCreateWithoutMessageInputSchema).array(),z.lazy(() => ChatMessageActionUncheckedCreateWithoutMessageInputSchema),z.lazy(() => ChatMessageActionUncheckedCreateWithoutMessageInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatMessageActionCreateOrConnectWithoutMessageInputSchema),z.lazy(() => ChatMessageActionCreateOrConnectWithoutMessageInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ChatMessageActionUpsertWithWhereUniqueWithoutMessageInputSchema),z.lazy(() => ChatMessageActionUpsertWithWhereUniqueWithoutMessageInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatMessageActionCreateManyMessageInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ChatMessageActionWhereUniqueInputSchema),z.lazy(() => ChatMessageActionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ChatMessageActionWhereUniqueInputSchema),z.lazy(() => ChatMessageActionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ChatMessageActionWhereUniqueInputSchema),z.lazy(() => ChatMessageActionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ChatMessageActionWhereUniqueInputSchema),z.lazy(() => ChatMessageActionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ChatMessageActionUpdateWithWhereUniqueWithoutMessageInputSchema),z.lazy(() => ChatMessageActionUpdateWithWhereUniqueWithoutMessageInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ChatMessageActionUpdateManyWithWhereWithoutMessageInputSchema),z.lazy(() => ChatMessageActionUpdateManyWithWhereWithoutMessageInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ChatMessageActionScalarWhereInputSchema),z.lazy(() => ChatMessageActionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ConversationUpdateOneRequiredWithoutMessagesNestedInputSchema: z.ZodType<Prisma.ConversationUpdateOneRequiredWithoutMessagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ConversationCreateWithoutMessagesInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ConversationCreateOrConnectWithoutMessagesInputSchema).optional(),
  upsert: z.lazy(() => ConversationUpsertWithoutMessagesInputSchema).optional(),
  connect: z.lazy(() => ConversationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ConversationUpdateToOneWithWhereWithoutMessagesInputSchema),z.lazy(() => ConversationUpdateWithoutMessagesInputSchema),z.lazy(() => ConversationUncheckedUpdateWithoutMessagesInputSchema) ]).optional(),
}).strict();

export const ChatMessageActionUncheckedUpdateManyWithoutMessageNestedInputSchema: z.ZodType<Prisma.ChatMessageActionUncheckedUpdateManyWithoutMessageNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChatMessageActionCreateWithoutMessageInputSchema),z.lazy(() => ChatMessageActionCreateWithoutMessageInputSchema).array(),z.lazy(() => ChatMessageActionUncheckedCreateWithoutMessageInputSchema),z.lazy(() => ChatMessageActionUncheckedCreateWithoutMessageInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatMessageActionCreateOrConnectWithoutMessageInputSchema),z.lazy(() => ChatMessageActionCreateOrConnectWithoutMessageInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ChatMessageActionUpsertWithWhereUniqueWithoutMessageInputSchema),z.lazy(() => ChatMessageActionUpsertWithWhereUniqueWithoutMessageInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatMessageActionCreateManyMessageInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ChatMessageActionWhereUniqueInputSchema),z.lazy(() => ChatMessageActionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ChatMessageActionWhereUniqueInputSchema),z.lazy(() => ChatMessageActionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ChatMessageActionWhereUniqueInputSchema),z.lazy(() => ChatMessageActionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ChatMessageActionWhereUniqueInputSchema),z.lazy(() => ChatMessageActionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ChatMessageActionUpdateWithWhereUniqueWithoutMessageInputSchema),z.lazy(() => ChatMessageActionUpdateWithWhereUniqueWithoutMessageInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ChatMessageActionUpdateManyWithWhereWithoutMessageInputSchema),z.lazy(() => ChatMessageActionUpdateManyWithWhereWithoutMessageInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ChatMessageActionScalarWhereInputSchema),z.lazy(() => ChatMessageActionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutChatMessageActionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutChatMessageActionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutChatMessageActionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutChatMessageActionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutChatMessageActionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const ChatMessageCreateNestedOneWithoutUserActionOnMessageInputSchema: z.ZodType<Prisma.ChatMessageCreateNestedOneWithoutUserActionOnMessageInput> = z.object({
  create: z.union([ z.lazy(() => ChatMessageCreateWithoutUserActionOnMessageInputSchema),z.lazy(() => ChatMessageUncheckedCreateWithoutUserActionOnMessageInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ChatMessageCreateOrConnectWithoutUserActionOnMessageInputSchema).optional(),
  connect: z.lazy(() => ChatMessageWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutChatMessageActionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutChatMessageActionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutChatMessageActionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutChatMessageActionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutChatMessageActionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutChatMessageActionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutChatMessageActionsInputSchema),z.lazy(() => UserUpdateWithoutChatMessageActionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutChatMessageActionsInputSchema) ]).optional(),
}).strict();

export const ChatMessageUpdateOneRequiredWithoutUserActionOnMessageNestedInputSchema: z.ZodType<Prisma.ChatMessageUpdateOneRequiredWithoutUserActionOnMessageNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChatMessageCreateWithoutUserActionOnMessageInputSchema),z.lazy(() => ChatMessageUncheckedCreateWithoutUserActionOnMessageInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ChatMessageCreateOrConnectWithoutUserActionOnMessageInputSchema).optional(),
  upsert: z.lazy(() => ChatMessageUpsertWithoutUserActionOnMessageInputSchema).optional(),
  connect: z.lazy(() => ChatMessageWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ChatMessageUpdateToOneWithWhereWithoutUserActionOnMessageInputSchema),z.lazy(() => ChatMessageUpdateWithoutUserActionOnMessageInputSchema),z.lazy(() => ChatMessageUncheckedUpdateWithoutUserActionOnMessageInputSchema) ]).optional(),
}).strict();

export const ChatMessageCreateNestedManyWithoutConversationInputSchema: z.ZodType<Prisma.ChatMessageCreateNestedManyWithoutConversationInput> = z.object({
  create: z.union([ z.lazy(() => ChatMessageCreateWithoutConversationInputSchema),z.lazy(() => ChatMessageCreateWithoutConversationInputSchema).array(),z.lazy(() => ChatMessageUncheckedCreateWithoutConversationInputSchema),z.lazy(() => ChatMessageUncheckedCreateWithoutConversationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatMessageCreateOrConnectWithoutConversationInputSchema),z.lazy(() => ChatMessageCreateOrConnectWithoutConversationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatMessageCreateManyConversationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutConversationsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutConversationsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutConversationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutConversationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutConversationsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const AppCreateNestedOneWithoutUsingInputSchema: z.ZodType<Prisma.AppCreateNestedOneWithoutUsingInput> = z.object({
  create: z.union([ z.lazy(() => AppCreateWithoutUsingInputSchema),z.lazy(() => AppUncheckedCreateWithoutUsingInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AppCreateOrConnectWithoutUsingInputSchema).optional(),
  connect: z.lazy(() => AppWhereUniqueInputSchema).optional()
}).strict();

export const ChatMessageUncheckedCreateNestedManyWithoutConversationInputSchema: z.ZodType<Prisma.ChatMessageUncheckedCreateNestedManyWithoutConversationInput> = z.object({
  create: z.union([ z.lazy(() => ChatMessageCreateWithoutConversationInputSchema),z.lazy(() => ChatMessageCreateWithoutConversationInputSchema).array(),z.lazy(() => ChatMessageUncheckedCreateWithoutConversationInputSchema),z.lazy(() => ChatMessageUncheckedCreateWithoutConversationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatMessageCreateOrConnectWithoutConversationInputSchema),z.lazy(() => ChatMessageCreateOrConnectWithoutConversationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatMessageCreateManyConversationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ChatMessageUpdateManyWithoutConversationNestedInputSchema: z.ZodType<Prisma.ChatMessageUpdateManyWithoutConversationNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChatMessageCreateWithoutConversationInputSchema),z.lazy(() => ChatMessageCreateWithoutConversationInputSchema).array(),z.lazy(() => ChatMessageUncheckedCreateWithoutConversationInputSchema),z.lazy(() => ChatMessageUncheckedCreateWithoutConversationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatMessageCreateOrConnectWithoutConversationInputSchema),z.lazy(() => ChatMessageCreateOrConnectWithoutConversationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ChatMessageUpsertWithWhereUniqueWithoutConversationInputSchema),z.lazy(() => ChatMessageUpsertWithWhereUniqueWithoutConversationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatMessageCreateManyConversationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ChatMessageUpdateWithWhereUniqueWithoutConversationInputSchema),z.lazy(() => ChatMessageUpdateWithWhereUniqueWithoutConversationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ChatMessageUpdateManyWithWhereWithoutConversationInputSchema),z.lazy(() => ChatMessageUpdateManyWithWhereWithoutConversationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ChatMessageScalarWhereInputSchema),z.lazy(() => ChatMessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutConversationsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutConversationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutConversationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutConversationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutConversationsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutConversationsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutConversationsInputSchema),z.lazy(() => UserUpdateWithoutConversationsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutConversationsInputSchema) ]).optional(),
}).strict();

export const AppUpdateOneRequiredWithoutUsingNestedInputSchema: z.ZodType<Prisma.AppUpdateOneRequiredWithoutUsingNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppCreateWithoutUsingInputSchema),z.lazy(() => AppUncheckedCreateWithoutUsingInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AppCreateOrConnectWithoutUsingInputSchema).optional(),
  upsert: z.lazy(() => AppUpsertWithoutUsingInputSchema).optional(),
  connect: z.lazy(() => AppWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AppUpdateToOneWithWhereWithoutUsingInputSchema),z.lazy(() => AppUpdateWithoutUsingInputSchema),z.lazy(() => AppUncheckedUpdateWithoutUsingInputSchema) ]).optional(),
}).strict();

export const ChatMessageUncheckedUpdateManyWithoutConversationNestedInputSchema: z.ZodType<Prisma.ChatMessageUncheckedUpdateManyWithoutConversationNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChatMessageCreateWithoutConversationInputSchema),z.lazy(() => ChatMessageCreateWithoutConversationInputSchema).array(),z.lazy(() => ChatMessageUncheckedCreateWithoutConversationInputSchema),z.lazy(() => ChatMessageUncheckedCreateWithoutConversationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatMessageCreateOrConnectWithoutConversationInputSchema),z.lazy(() => ChatMessageCreateOrConnectWithoutConversationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ChatMessageUpsertWithWhereUniqueWithoutConversationInputSchema),z.lazy(() => ChatMessageUpsertWithWhereUniqueWithoutConversationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatMessageCreateManyConversationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ChatMessageUpdateWithWhereUniqueWithoutConversationInputSchema),z.lazy(() => ChatMessageUpdateWithWhereUniqueWithoutConversationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ChatMessageUpdateManyWithWhereWithoutConversationInputSchema),z.lazy(() => ChatMessageUpdateManyWithWhereWithoutConversationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ChatMessageScalarWhereInputSchema),z.lazy(() => ChatMessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutFollowedByInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutFollowedByInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFollowedByInputSchema),z.lazy(() => UserUncheckedCreateWithoutFollowedByInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFollowedByInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutFollowingInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutFollowingInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFollowingInputSchema),z.lazy(() => UserUncheckedCreateWithoutFollowingInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFollowingInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutFollowedByNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutFollowedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFollowedByInputSchema),z.lazy(() => UserUncheckedCreateWithoutFollowedByInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFollowedByInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutFollowedByInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutFollowedByInputSchema),z.lazy(() => UserUpdateWithoutFollowedByInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFollowedByInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutFollowingNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutFollowingNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFollowingInputSchema),z.lazy(() => UserUncheckedCreateWithoutFollowingInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFollowingInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutFollowingInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutFollowingInputSchema),z.lazy(() => UserUpdateWithoutFollowingInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFollowingInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutInvitedFromInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutInvitedFromInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutInvitedFromInputSchema),z.lazy(() => UserUncheckedCreateWithoutInvitedFromInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutInvitedFromInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutInvitedToInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutInvitedToInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutInvitedToInputSchema),z.lazy(() => UserUncheckedCreateWithoutInvitedToInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutInvitedToInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const EnumInvitationStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumInvitationStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => InvitationStatusSchema).optional()
}).strict();

export const UserUpdateOneWithoutInvitedFromNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutInvitedFromNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutInvitedFromInputSchema),z.lazy(() => UserUncheckedCreateWithoutInvitedFromInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutInvitedFromInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutInvitedFromInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutInvitedFromInputSchema),z.lazy(() => UserUpdateWithoutInvitedFromInputSchema),z.lazy(() => UserUncheckedUpdateWithoutInvitedFromInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneWithoutInvitedToNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutInvitedToNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutInvitedToInputSchema),z.lazy(() => UserUncheckedCreateWithoutInvitedToInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutInvitedToInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutInvitedToInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutInvitedToInputSchema),z.lazy(() => UserUpdateWithoutInvitedToInputSchema),z.lazy(() => UserUncheckedUpdateWithoutInvitedToInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema),z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict();

export const AppCreateNestedOneWithoutStarringInputSchema: z.ZodType<Prisma.AppCreateNestedOneWithoutStarringInput> = z.object({
  create: z.union([ z.lazy(() => AppCreateWithoutStarringInputSchema),z.lazy(() => AppUncheckedCreateWithoutStarringInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AppCreateOrConnectWithoutStarringInputSchema).optional(),
  connect: z.lazy(() => AppWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutStarringAppInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutStarringAppInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutStarringAppInputSchema),z.lazy(() => UserUncheckedCreateWithoutStarringAppInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutStarringAppInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const AppUpdateOneRequiredWithoutStarringNestedInputSchema: z.ZodType<Prisma.AppUpdateOneRequiredWithoutStarringNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppCreateWithoutStarringInputSchema),z.lazy(() => AppUncheckedCreateWithoutStarringInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AppCreateOrConnectWithoutStarringInputSchema).optional(),
  upsert: z.lazy(() => AppUpsertWithoutStarringInputSchema).optional(),
  connect: z.lazy(() => AppWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AppUpdateToOneWithWhereWithoutStarringInputSchema),z.lazy(() => AppUpdateWithoutStarringInputSchema),z.lazy(() => AppUncheckedUpdateWithoutStarringInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutStarringAppNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutStarringAppNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutStarringAppInputSchema),z.lazy(() => UserUncheckedCreateWithoutStarringAppInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutStarringAppInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutStarringAppInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutStarringAppInputSchema),z.lazy(() => UserUpdateWithoutStarringAppInputSchema),z.lazy(() => UserUncheckedUpdateWithoutStarringAppInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutTranscationInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutTranscationInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTranscationInputSchema),z.lazy(() => UserUncheckedCreateWithoutTranscationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTranscationInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutTranscationNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutTranscationNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTranscationInputSchema),z.lazy(() => UserUncheckedCreateWithoutTranscationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTranscationInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutTranscationInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutTranscationInputSchema),z.lazy(() => UserUpdateWithoutTranscationInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTranscationInputSchema) ]).optional(),
}).strict();

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const InvitationRelationCreateNestedManyWithoutFromInputSchema: z.ZodType<Prisma.InvitationRelationCreateNestedManyWithoutFromInput> = z.object({
  create: z.union([ z.lazy(() => InvitationRelationCreateWithoutFromInputSchema),z.lazy(() => InvitationRelationCreateWithoutFromInputSchema).array(),z.lazy(() => InvitationRelationUncheckedCreateWithoutFromInputSchema),z.lazy(() => InvitationRelationUncheckedCreateWithoutFromInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationRelationCreateOrConnectWithoutFromInputSchema),z.lazy(() => InvitationRelationCreateOrConnectWithoutFromInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationRelationCreateManyFromInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InvitationRelationWhereUniqueInputSchema),z.lazy(() => InvitationRelationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const InvitationRelationCreateNestedManyWithoutToInputSchema: z.ZodType<Prisma.InvitationRelationCreateNestedManyWithoutToInput> = z.object({
  create: z.union([ z.lazy(() => InvitationRelationCreateWithoutToInputSchema),z.lazy(() => InvitationRelationCreateWithoutToInputSchema).array(),z.lazy(() => InvitationRelationUncheckedCreateWithoutToInputSchema),z.lazy(() => InvitationRelationUncheckedCreateWithoutToInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationRelationCreateOrConnectWithoutToInputSchema),z.lazy(() => InvitationRelationCreateOrConnectWithoutToInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationRelationCreateManyToInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InvitationRelationWhereUniqueInputSchema),z.lazy(() => InvitationRelationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FollowRelationCreateNestedManyWithoutFromInputSchema: z.ZodType<Prisma.FollowRelationCreateNestedManyWithoutFromInput> = z.object({
  create: z.union([ z.lazy(() => FollowRelationCreateWithoutFromInputSchema),z.lazy(() => FollowRelationCreateWithoutFromInputSchema).array(),z.lazy(() => FollowRelationUncheckedCreateWithoutFromInputSchema),z.lazy(() => FollowRelationUncheckedCreateWithoutFromInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FollowRelationCreateOrConnectWithoutFromInputSchema),z.lazy(() => FollowRelationCreateOrConnectWithoutFromInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FollowRelationCreateManyFromInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FollowRelationWhereUniqueInputSchema),z.lazy(() => FollowRelationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FollowRelationCreateNestedManyWithoutToInputSchema: z.ZodType<Prisma.FollowRelationCreateNestedManyWithoutToInput> = z.object({
  create: z.union([ z.lazy(() => FollowRelationCreateWithoutToInputSchema),z.lazy(() => FollowRelationCreateWithoutToInputSchema).array(),z.lazy(() => FollowRelationUncheckedCreateWithoutToInputSchema),z.lazy(() => FollowRelationUncheckedCreateWithoutToInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FollowRelationCreateOrConnectWithoutToInputSchema),z.lazy(() => FollowRelationCreateOrConnectWithoutToInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FollowRelationCreateManyToInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FollowRelationWhereUniqueInputSchema),z.lazy(() => FollowRelationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ChatMessageCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ChatMessageCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ChatMessageCreateWithoutUserInputSchema),z.lazy(() => ChatMessageCreateWithoutUserInputSchema).array(),z.lazy(() => ChatMessageUncheckedCreateWithoutUserInputSchema),z.lazy(() => ChatMessageUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatMessageCreateOrConnectWithoutUserInputSchema),z.lazy(() => ChatMessageCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatMessageCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ChatMessageActionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ChatMessageActionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ChatMessageActionCreateWithoutUserInputSchema),z.lazy(() => ChatMessageActionCreateWithoutUserInputSchema).array(),z.lazy(() => ChatMessageActionUncheckedCreateWithoutUserInputSchema),z.lazy(() => ChatMessageActionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatMessageActionCreateOrConnectWithoutUserInputSchema),z.lazy(() => ChatMessageActionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatMessageActionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ChatMessageActionWhereUniqueInputSchema),z.lazy(() => ChatMessageActionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AppTagCreateNestedManyWithoutCreatorInputSchema: z.ZodType<Prisma.AppTagCreateNestedManyWithoutCreatorInput> = z.object({
  create: z.union([ z.lazy(() => AppTagCreateWithoutCreatorInputSchema),z.lazy(() => AppTagCreateWithoutCreatorInputSchema).array(),z.lazy(() => AppTagUncheckedCreateWithoutCreatorInputSchema),z.lazy(() => AppTagUncheckedCreateWithoutCreatorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppTagCreateOrConnectWithoutCreatorInputSchema),z.lazy(() => AppTagCreateOrConnectWithoutCreatorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppTagCreateManyCreatorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AppTagWhereUniqueInputSchema),z.lazy(() => AppTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AppCommentCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AppCommentCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AppCommentCreateWithoutUserInputSchema),z.lazy(() => AppCommentCreateWithoutUserInputSchema).array(),z.lazy(() => AppCommentUncheckedCreateWithoutUserInputSchema),z.lazy(() => AppCommentUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppCommentCreateOrConnectWithoutUserInputSchema),z.lazy(() => AppCommentCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppCommentCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AppCommentWhereUniqueInputSchema),z.lazy(() => AppCommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AppActionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AppActionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AppActionCreateWithoutUserInputSchema),z.lazy(() => AppActionCreateWithoutUserInputSchema).array(),z.lazy(() => AppActionUncheckedCreateWithoutUserInputSchema),z.lazy(() => AppActionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppActionCreateOrConnectWithoutUserInputSchema),z.lazy(() => AppActionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppActionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AppActionWhereUniqueInputSchema),z.lazy(() => AppActionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StarringAppCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.StarringAppCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => StarringAppCreateWithoutUserInputSchema),z.lazy(() => StarringAppCreateWithoutUserInputSchema).array(),z.lazy(() => StarringAppUncheckedCreateWithoutUserInputSchema),z.lazy(() => StarringAppUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StarringAppCreateOrConnectWithoutUserInputSchema),z.lazy(() => StarringAppCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StarringAppCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StarringAppWhereUniqueInputSchema),z.lazy(() => StarringAppWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AppCreateNestedManyWithoutCreatorInputSchema: z.ZodType<Prisma.AppCreateNestedManyWithoutCreatorInput> = z.object({
  create: z.union([ z.lazy(() => AppCreateWithoutCreatorInputSchema),z.lazy(() => AppCreateWithoutCreatorInputSchema).array(),z.lazy(() => AppUncheckedCreateWithoutCreatorInputSchema),z.lazy(() => AppUncheckedCreateWithoutCreatorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppCreateOrConnectWithoutCreatorInputSchema),z.lazy(() => AppCreateOrConnectWithoutCreatorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppCreateManyCreatorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ConversationCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ConversationCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ConversationCreateWithoutUserInputSchema),z.lazy(() => ConversationCreateWithoutUserInputSchema).array(),z.lazy(() => ConversationUncheckedCreateWithoutUserInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConversationCreateOrConnectWithoutUserInputSchema),z.lazy(() => ConversationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConversationCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TranscationCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.TranscationCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => TranscationCreateWithoutUserInputSchema),z.lazy(() => TranscationCreateWithoutUserInputSchema).array(),z.lazy(() => TranscationUncheckedCreateWithoutUserInputSchema),z.lazy(() => TranscationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TranscationCreateOrConnectWithoutUserInputSchema),z.lazy(() => TranscationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TranscationCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TranscationWhereUniqueInputSchema),z.lazy(() => TranscationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const InvitationRelationUncheckedCreateNestedManyWithoutFromInputSchema: z.ZodType<Prisma.InvitationRelationUncheckedCreateNestedManyWithoutFromInput> = z.object({
  create: z.union([ z.lazy(() => InvitationRelationCreateWithoutFromInputSchema),z.lazy(() => InvitationRelationCreateWithoutFromInputSchema).array(),z.lazy(() => InvitationRelationUncheckedCreateWithoutFromInputSchema),z.lazy(() => InvitationRelationUncheckedCreateWithoutFromInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationRelationCreateOrConnectWithoutFromInputSchema),z.lazy(() => InvitationRelationCreateOrConnectWithoutFromInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationRelationCreateManyFromInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InvitationRelationWhereUniqueInputSchema),z.lazy(() => InvitationRelationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const InvitationRelationUncheckedCreateNestedManyWithoutToInputSchema: z.ZodType<Prisma.InvitationRelationUncheckedCreateNestedManyWithoutToInput> = z.object({
  create: z.union([ z.lazy(() => InvitationRelationCreateWithoutToInputSchema),z.lazy(() => InvitationRelationCreateWithoutToInputSchema).array(),z.lazy(() => InvitationRelationUncheckedCreateWithoutToInputSchema),z.lazy(() => InvitationRelationUncheckedCreateWithoutToInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationRelationCreateOrConnectWithoutToInputSchema),z.lazy(() => InvitationRelationCreateOrConnectWithoutToInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationRelationCreateManyToInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InvitationRelationWhereUniqueInputSchema),z.lazy(() => InvitationRelationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FollowRelationUncheckedCreateNestedManyWithoutFromInputSchema: z.ZodType<Prisma.FollowRelationUncheckedCreateNestedManyWithoutFromInput> = z.object({
  create: z.union([ z.lazy(() => FollowRelationCreateWithoutFromInputSchema),z.lazy(() => FollowRelationCreateWithoutFromInputSchema).array(),z.lazy(() => FollowRelationUncheckedCreateWithoutFromInputSchema),z.lazy(() => FollowRelationUncheckedCreateWithoutFromInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FollowRelationCreateOrConnectWithoutFromInputSchema),z.lazy(() => FollowRelationCreateOrConnectWithoutFromInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FollowRelationCreateManyFromInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FollowRelationWhereUniqueInputSchema),z.lazy(() => FollowRelationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FollowRelationUncheckedCreateNestedManyWithoutToInputSchema: z.ZodType<Prisma.FollowRelationUncheckedCreateNestedManyWithoutToInput> = z.object({
  create: z.union([ z.lazy(() => FollowRelationCreateWithoutToInputSchema),z.lazy(() => FollowRelationCreateWithoutToInputSchema).array(),z.lazy(() => FollowRelationUncheckedCreateWithoutToInputSchema),z.lazy(() => FollowRelationUncheckedCreateWithoutToInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FollowRelationCreateOrConnectWithoutToInputSchema),z.lazy(() => FollowRelationCreateOrConnectWithoutToInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FollowRelationCreateManyToInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FollowRelationWhereUniqueInputSchema),z.lazy(() => FollowRelationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ChatMessageUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ChatMessageUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ChatMessageCreateWithoutUserInputSchema),z.lazy(() => ChatMessageCreateWithoutUserInputSchema).array(),z.lazy(() => ChatMessageUncheckedCreateWithoutUserInputSchema),z.lazy(() => ChatMessageUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatMessageCreateOrConnectWithoutUserInputSchema),z.lazy(() => ChatMessageCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatMessageCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ChatMessageActionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ChatMessageActionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ChatMessageActionCreateWithoutUserInputSchema),z.lazy(() => ChatMessageActionCreateWithoutUserInputSchema).array(),z.lazy(() => ChatMessageActionUncheckedCreateWithoutUserInputSchema),z.lazy(() => ChatMessageActionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatMessageActionCreateOrConnectWithoutUserInputSchema),z.lazy(() => ChatMessageActionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatMessageActionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ChatMessageActionWhereUniqueInputSchema),z.lazy(() => ChatMessageActionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AppTagUncheckedCreateNestedManyWithoutCreatorInputSchema: z.ZodType<Prisma.AppTagUncheckedCreateNestedManyWithoutCreatorInput> = z.object({
  create: z.union([ z.lazy(() => AppTagCreateWithoutCreatorInputSchema),z.lazy(() => AppTagCreateWithoutCreatorInputSchema).array(),z.lazy(() => AppTagUncheckedCreateWithoutCreatorInputSchema),z.lazy(() => AppTagUncheckedCreateWithoutCreatorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppTagCreateOrConnectWithoutCreatorInputSchema),z.lazy(() => AppTagCreateOrConnectWithoutCreatorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppTagCreateManyCreatorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AppTagWhereUniqueInputSchema),z.lazy(() => AppTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AppCommentUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AppCommentUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AppCommentCreateWithoutUserInputSchema),z.lazy(() => AppCommentCreateWithoutUserInputSchema).array(),z.lazy(() => AppCommentUncheckedCreateWithoutUserInputSchema),z.lazy(() => AppCommentUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppCommentCreateOrConnectWithoutUserInputSchema),z.lazy(() => AppCommentCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppCommentCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AppCommentWhereUniqueInputSchema),z.lazy(() => AppCommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AppActionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AppActionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AppActionCreateWithoutUserInputSchema),z.lazy(() => AppActionCreateWithoutUserInputSchema).array(),z.lazy(() => AppActionUncheckedCreateWithoutUserInputSchema),z.lazy(() => AppActionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppActionCreateOrConnectWithoutUserInputSchema),z.lazy(() => AppActionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppActionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AppActionWhereUniqueInputSchema),z.lazy(() => AppActionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StarringAppUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.StarringAppUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => StarringAppCreateWithoutUserInputSchema),z.lazy(() => StarringAppCreateWithoutUserInputSchema).array(),z.lazy(() => StarringAppUncheckedCreateWithoutUserInputSchema),z.lazy(() => StarringAppUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StarringAppCreateOrConnectWithoutUserInputSchema),z.lazy(() => StarringAppCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StarringAppCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StarringAppWhereUniqueInputSchema),z.lazy(() => StarringAppWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AppUncheckedCreateNestedManyWithoutCreatorInputSchema: z.ZodType<Prisma.AppUncheckedCreateNestedManyWithoutCreatorInput> = z.object({
  create: z.union([ z.lazy(() => AppCreateWithoutCreatorInputSchema),z.lazy(() => AppCreateWithoutCreatorInputSchema).array(),z.lazy(() => AppUncheckedCreateWithoutCreatorInputSchema),z.lazy(() => AppUncheckedCreateWithoutCreatorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppCreateOrConnectWithoutCreatorInputSchema),z.lazy(() => AppCreateOrConnectWithoutCreatorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppCreateManyCreatorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ConversationUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ConversationUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ConversationCreateWithoutUserInputSchema),z.lazy(() => ConversationCreateWithoutUserInputSchema).array(),z.lazy(() => ConversationUncheckedCreateWithoutUserInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConversationCreateOrConnectWithoutUserInputSchema),z.lazy(() => ConversationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConversationCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TranscationUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.TranscationUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => TranscationCreateWithoutUserInputSchema),z.lazy(() => TranscationCreateWithoutUserInputSchema).array(),z.lazy(() => TranscationUncheckedCreateWithoutUserInputSchema),z.lazy(() => TranscationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TranscationCreateOrConnectWithoutUserInputSchema),z.lazy(() => TranscationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TranscationCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TranscationWhereUniqueInputSchema),z.lazy(() => TranscationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const InvitationRelationUpdateManyWithoutFromNestedInputSchema: z.ZodType<Prisma.InvitationRelationUpdateManyWithoutFromNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvitationRelationCreateWithoutFromInputSchema),z.lazy(() => InvitationRelationCreateWithoutFromInputSchema).array(),z.lazy(() => InvitationRelationUncheckedCreateWithoutFromInputSchema),z.lazy(() => InvitationRelationUncheckedCreateWithoutFromInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationRelationCreateOrConnectWithoutFromInputSchema),z.lazy(() => InvitationRelationCreateOrConnectWithoutFromInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InvitationRelationUpsertWithWhereUniqueWithoutFromInputSchema),z.lazy(() => InvitationRelationUpsertWithWhereUniqueWithoutFromInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationRelationCreateManyFromInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InvitationRelationWhereUniqueInputSchema),z.lazy(() => InvitationRelationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InvitationRelationWhereUniqueInputSchema),z.lazy(() => InvitationRelationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InvitationRelationWhereUniqueInputSchema),z.lazy(() => InvitationRelationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InvitationRelationWhereUniqueInputSchema),z.lazy(() => InvitationRelationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InvitationRelationUpdateWithWhereUniqueWithoutFromInputSchema),z.lazy(() => InvitationRelationUpdateWithWhereUniqueWithoutFromInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InvitationRelationUpdateManyWithWhereWithoutFromInputSchema),z.lazy(() => InvitationRelationUpdateManyWithWhereWithoutFromInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InvitationRelationScalarWhereInputSchema),z.lazy(() => InvitationRelationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const InvitationRelationUpdateManyWithoutToNestedInputSchema: z.ZodType<Prisma.InvitationRelationUpdateManyWithoutToNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvitationRelationCreateWithoutToInputSchema),z.lazy(() => InvitationRelationCreateWithoutToInputSchema).array(),z.lazy(() => InvitationRelationUncheckedCreateWithoutToInputSchema),z.lazy(() => InvitationRelationUncheckedCreateWithoutToInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationRelationCreateOrConnectWithoutToInputSchema),z.lazy(() => InvitationRelationCreateOrConnectWithoutToInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InvitationRelationUpsertWithWhereUniqueWithoutToInputSchema),z.lazy(() => InvitationRelationUpsertWithWhereUniqueWithoutToInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationRelationCreateManyToInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InvitationRelationWhereUniqueInputSchema),z.lazy(() => InvitationRelationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InvitationRelationWhereUniqueInputSchema),z.lazy(() => InvitationRelationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InvitationRelationWhereUniqueInputSchema),z.lazy(() => InvitationRelationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InvitationRelationWhereUniqueInputSchema),z.lazy(() => InvitationRelationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InvitationRelationUpdateWithWhereUniqueWithoutToInputSchema),z.lazy(() => InvitationRelationUpdateWithWhereUniqueWithoutToInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InvitationRelationUpdateManyWithWhereWithoutToInputSchema),z.lazy(() => InvitationRelationUpdateManyWithWhereWithoutToInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InvitationRelationScalarWhereInputSchema),z.lazy(() => InvitationRelationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FollowRelationUpdateManyWithoutFromNestedInputSchema: z.ZodType<Prisma.FollowRelationUpdateManyWithoutFromNestedInput> = z.object({
  create: z.union([ z.lazy(() => FollowRelationCreateWithoutFromInputSchema),z.lazy(() => FollowRelationCreateWithoutFromInputSchema).array(),z.lazy(() => FollowRelationUncheckedCreateWithoutFromInputSchema),z.lazy(() => FollowRelationUncheckedCreateWithoutFromInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FollowRelationCreateOrConnectWithoutFromInputSchema),z.lazy(() => FollowRelationCreateOrConnectWithoutFromInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FollowRelationUpsertWithWhereUniqueWithoutFromInputSchema),z.lazy(() => FollowRelationUpsertWithWhereUniqueWithoutFromInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FollowRelationCreateManyFromInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FollowRelationWhereUniqueInputSchema),z.lazy(() => FollowRelationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FollowRelationWhereUniqueInputSchema),z.lazy(() => FollowRelationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FollowRelationWhereUniqueInputSchema),z.lazy(() => FollowRelationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FollowRelationWhereUniqueInputSchema),z.lazy(() => FollowRelationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FollowRelationUpdateWithWhereUniqueWithoutFromInputSchema),z.lazy(() => FollowRelationUpdateWithWhereUniqueWithoutFromInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FollowRelationUpdateManyWithWhereWithoutFromInputSchema),z.lazy(() => FollowRelationUpdateManyWithWhereWithoutFromInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FollowRelationScalarWhereInputSchema),z.lazy(() => FollowRelationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FollowRelationUpdateManyWithoutToNestedInputSchema: z.ZodType<Prisma.FollowRelationUpdateManyWithoutToNestedInput> = z.object({
  create: z.union([ z.lazy(() => FollowRelationCreateWithoutToInputSchema),z.lazy(() => FollowRelationCreateWithoutToInputSchema).array(),z.lazy(() => FollowRelationUncheckedCreateWithoutToInputSchema),z.lazy(() => FollowRelationUncheckedCreateWithoutToInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FollowRelationCreateOrConnectWithoutToInputSchema),z.lazy(() => FollowRelationCreateOrConnectWithoutToInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FollowRelationUpsertWithWhereUniqueWithoutToInputSchema),z.lazy(() => FollowRelationUpsertWithWhereUniqueWithoutToInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FollowRelationCreateManyToInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FollowRelationWhereUniqueInputSchema),z.lazy(() => FollowRelationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FollowRelationWhereUniqueInputSchema),z.lazy(() => FollowRelationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FollowRelationWhereUniqueInputSchema),z.lazy(() => FollowRelationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FollowRelationWhereUniqueInputSchema),z.lazy(() => FollowRelationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FollowRelationUpdateWithWhereUniqueWithoutToInputSchema),z.lazy(() => FollowRelationUpdateWithWhereUniqueWithoutToInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FollowRelationUpdateManyWithWhereWithoutToInputSchema),z.lazy(() => FollowRelationUpdateManyWithWhereWithoutToInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FollowRelationScalarWhereInputSchema),z.lazy(() => FollowRelationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ChatMessageUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ChatMessageUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChatMessageCreateWithoutUserInputSchema),z.lazy(() => ChatMessageCreateWithoutUserInputSchema).array(),z.lazy(() => ChatMessageUncheckedCreateWithoutUserInputSchema),z.lazy(() => ChatMessageUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatMessageCreateOrConnectWithoutUserInputSchema),z.lazy(() => ChatMessageCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ChatMessageUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ChatMessageUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatMessageCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ChatMessageUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ChatMessageUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ChatMessageUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ChatMessageUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ChatMessageScalarWhereInputSchema),z.lazy(() => ChatMessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ChatMessageActionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ChatMessageActionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChatMessageActionCreateWithoutUserInputSchema),z.lazy(() => ChatMessageActionCreateWithoutUserInputSchema).array(),z.lazy(() => ChatMessageActionUncheckedCreateWithoutUserInputSchema),z.lazy(() => ChatMessageActionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatMessageActionCreateOrConnectWithoutUserInputSchema),z.lazy(() => ChatMessageActionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ChatMessageActionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ChatMessageActionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatMessageActionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ChatMessageActionWhereUniqueInputSchema),z.lazy(() => ChatMessageActionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ChatMessageActionWhereUniqueInputSchema),z.lazy(() => ChatMessageActionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ChatMessageActionWhereUniqueInputSchema),z.lazy(() => ChatMessageActionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ChatMessageActionWhereUniqueInputSchema),z.lazy(() => ChatMessageActionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ChatMessageActionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ChatMessageActionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ChatMessageActionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ChatMessageActionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ChatMessageActionScalarWhereInputSchema),z.lazy(() => ChatMessageActionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AppTagUpdateManyWithoutCreatorNestedInputSchema: z.ZodType<Prisma.AppTagUpdateManyWithoutCreatorNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppTagCreateWithoutCreatorInputSchema),z.lazy(() => AppTagCreateWithoutCreatorInputSchema).array(),z.lazy(() => AppTagUncheckedCreateWithoutCreatorInputSchema),z.lazy(() => AppTagUncheckedCreateWithoutCreatorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppTagCreateOrConnectWithoutCreatorInputSchema),z.lazy(() => AppTagCreateOrConnectWithoutCreatorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppTagUpsertWithWhereUniqueWithoutCreatorInputSchema),z.lazy(() => AppTagUpsertWithWhereUniqueWithoutCreatorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppTagCreateManyCreatorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AppTagWhereUniqueInputSchema),z.lazy(() => AppTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppTagWhereUniqueInputSchema),z.lazy(() => AppTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppTagWhereUniqueInputSchema),z.lazy(() => AppTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppTagWhereUniqueInputSchema),z.lazy(() => AppTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppTagUpdateWithWhereUniqueWithoutCreatorInputSchema),z.lazy(() => AppTagUpdateWithWhereUniqueWithoutCreatorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppTagUpdateManyWithWhereWithoutCreatorInputSchema),z.lazy(() => AppTagUpdateManyWithWhereWithoutCreatorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppTagScalarWhereInputSchema),z.lazy(() => AppTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AppCommentUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AppCommentUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppCommentCreateWithoutUserInputSchema),z.lazy(() => AppCommentCreateWithoutUserInputSchema).array(),z.lazy(() => AppCommentUncheckedCreateWithoutUserInputSchema),z.lazy(() => AppCommentUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppCommentCreateOrConnectWithoutUserInputSchema),z.lazy(() => AppCommentCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppCommentUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AppCommentUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppCommentCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AppCommentWhereUniqueInputSchema),z.lazy(() => AppCommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppCommentWhereUniqueInputSchema),z.lazy(() => AppCommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppCommentWhereUniqueInputSchema),z.lazy(() => AppCommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppCommentWhereUniqueInputSchema),z.lazy(() => AppCommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppCommentUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AppCommentUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppCommentUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AppCommentUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppCommentScalarWhereInputSchema),z.lazy(() => AppCommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AppActionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AppActionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppActionCreateWithoutUserInputSchema),z.lazy(() => AppActionCreateWithoutUserInputSchema).array(),z.lazy(() => AppActionUncheckedCreateWithoutUserInputSchema),z.lazy(() => AppActionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppActionCreateOrConnectWithoutUserInputSchema),z.lazy(() => AppActionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppActionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AppActionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppActionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AppActionWhereUniqueInputSchema),z.lazy(() => AppActionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppActionWhereUniqueInputSchema),z.lazy(() => AppActionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppActionWhereUniqueInputSchema),z.lazy(() => AppActionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppActionWhereUniqueInputSchema),z.lazy(() => AppActionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppActionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AppActionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppActionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AppActionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppActionScalarWhereInputSchema),z.lazy(() => AppActionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StarringAppUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.StarringAppUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => StarringAppCreateWithoutUserInputSchema),z.lazy(() => StarringAppCreateWithoutUserInputSchema).array(),z.lazy(() => StarringAppUncheckedCreateWithoutUserInputSchema),z.lazy(() => StarringAppUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StarringAppCreateOrConnectWithoutUserInputSchema),z.lazy(() => StarringAppCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StarringAppUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => StarringAppUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StarringAppCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StarringAppWhereUniqueInputSchema),z.lazy(() => StarringAppWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StarringAppWhereUniqueInputSchema),z.lazy(() => StarringAppWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StarringAppWhereUniqueInputSchema),z.lazy(() => StarringAppWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StarringAppWhereUniqueInputSchema),z.lazy(() => StarringAppWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StarringAppUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => StarringAppUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StarringAppUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => StarringAppUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StarringAppScalarWhereInputSchema),z.lazy(() => StarringAppScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AppUpdateManyWithoutCreatorNestedInputSchema: z.ZodType<Prisma.AppUpdateManyWithoutCreatorNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppCreateWithoutCreatorInputSchema),z.lazy(() => AppCreateWithoutCreatorInputSchema).array(),z.lazy(() => AppUncheckedCreateWithoutCreatorInputSchema),z.lazy(() => AppUncheckedCreateWithoutCreatorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppCreateOrConnectWithoutCreatorInputSchema),z.lazy(() => AppCreateOrConnectWithoutCreatorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppUpsertWithWhereUniqueWithoutCreatorInputSchema),z.lazy(() => AppUpsertWithWhereUniqueWithoutCreatorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppCreateManyCreatorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppUpdateWithWhereUniqueWithoutCreatorInputSchema),z.lazy(() => AppUpdateWithWhereUniqueWithoutCreatorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppUpdateManyWithWhereWithoutCreatorInputSchema),z.lazy(() => AppUpdateManyWithWhereWithoutCreatorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppScalarWhereInputSchema),z.lazy(() => AppScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ConversationUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ConversationUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ConversationCreateWithoutUserInputSchema),z.lazy(() => ConversationCreateWithoutUserInputSchema).array(),z.lazy(() => ConversationUncheckedCreateWithoutUserInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConversationCreateOrConnectWithoutUserInputSchema),z.lazy(() => ConversationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ConversationUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ConversationUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConversationCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ConversationUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ConversationUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ConversationUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ConversationUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ConversationScalarWhereInputSchema),z.lazy(() => ConversationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TranscationUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.TranscationUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => TranscationCreateWithoutUserInputSchema),z.lazy(() => TranscationCreateWithoutUserInputSchema).array(),z.lazy(() => TranscationUncheckedCreateWithoutUserInputSchema),z.lazy(() => TranscationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TranscationCreateOrConnectWithoutUserInputSchema),z.lazy(() => TranscationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TranscationUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TranscationUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TranscationCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TranscationWhereUniqueInputSchema),z.lazy(() => TranscationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TranscationWhereUniqueInputSchema),z.lazy(() => TranscationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TranscationWhereUniqueInputSchema),z.lazy(() => TranscationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TranscationWhereUniqueInputSchema),z.lazy(() => TranscationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TranscationUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TranscationUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TranscationUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => TranscationUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TranscationScalarWhereInputSchema),z.lazy(() => TranscationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const InvitationRelationUncheckedUpdateManyWithoutFromNestedInputSchema: z.ZodType<Prisma.InvitationRelationUncheckedUpdateManyWithoutFromNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvitationRelationCreateWithoutFromInputSchema),z.lazy(() => InvitationRelationCreateWithoutFromInputSchema).array(),z.lazy(() => InvitationRelationUncheckedCreateWithoutFromInputSchema),z.lazy(() => InvitationRelationUncheckedCreateWithoutFromInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationRelationCreateOrConnectWithoutFromInputSchema),z.lazy(() => InvitationRelationCreateOrConnectWithoutFromInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InvitationRelationUpsertWithWhereUniqueWithoutFromInputSchema),z.lazy(() => InvitationRelationUpsertWithWhereUniqueWithoutFromInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationRelationCreateManyFromInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InvitationRelationWhereUniqueInputSchema),z.lazy(() => InvitationRelationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InvitationRelationWhereUniqueInputSchema),z.lazy(() => InvitationRelationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InvitationRelationWhereUniqueInputSchema),z.lazy(() => InvitationRelationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InvitationRelationWhereUniqueInputSchema),z.lazy(() => InvitationRelationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InvitationRelationUpdateWithWhereUniqueWithoutFromInputSchema),z.lazy(() => InvitationRelationUpdateWithWhereUniqueWithoutFromInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InvitationRelationUpdateManyWithWhereWithoutFromInputSchema),z.lazy(() => InvitationRelationUpdateManyWithWhereWithoutFromInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InvitationRelationScalarWhereInputSchema),z.lazy(() => InvitationRelationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const InvitationRelationUncheckedUpdateManyWithoutToNestedInputSchema: z.ZodType<Prisma.InvitationRelationUncheckedUpdateManyWithoutToNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvitationRelationCreateWithoutToInputSchema),z.lazy(() => InvitationRelationCreateWithoutToInputSchema).array(),z.lazy(() => InvitationRelationUncheckedCreateWithoutToInputSchema),z.lazy(() => InvitationRelationUncheckedCreateWithoutToInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationRelationCreateOrConnectWithoutToInputSchema),z.lazy(() => InvitationRelationCreateOrConnectWithoutToInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InvitationRelationUpsertWithWhereUniqueWithoutToInputSchema),z.lazy(() => InvitationRelationUpsertWithWhereUniqueWithoutToInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationRelationCreateManyToInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InvitationRelationWhereUniqueInputSchema),z.lazy(() => InvitationRelationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InvitationRelationWhereUniqueInputSchema),z.lazy(() => InvitationRelationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InvitationRelationWhereUniqueInputSchema),z.lazy(() => InvitationRelationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InvitationRelationWhereUniqueInputSchema),z.lazy(() => InvitationRelationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InvitationRelationUpdateWithWhereUniqueWithoutToInputSchema),z.lazy(() => InvitationRelationUpdateWithWhereUniqueWithoutToInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InvitationRelationUpdateManyWithWhereWithoutToInputSchema),z.lazy(() => InvitationRelationUpdateManyWithWhereWithoutToInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InvitationRelationScalarWhereInputSchema),z.lazy(() => InvitationRelationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FollowRelationUncheckedUpdateManyWithoutFromNestedInputSchema: z.ZodType<Prisma.FollowRelationUncheckedUpdateManyWithoutFromNestedInput> = z.object({
  create: z.union([ z.lazy(() => FollowRelationCreateWithoutFromInputSchema),z.lazy(() => FollowRelationCreateWithoutFromInputSchema).array(),z.lazy(() => FollowRelationUncheckedCreateWithoutFromInputSchema),z.lazy(() => FollowRelationUncheckedCreateWithoutFromInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FollowRelationCreateOrConnectWithoutFromInputSchema),z.lazy(() => FollowRelationCreateOrConnectWithoutFromInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FollowRelationUpsertWithWhereUniqueWithoutFromInputSchema),z.lazy(() => FollowRelationUpsertWithWhereUniqueWithoutFromInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FollowRelationCreateManyFromInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FollowRelationWhereUniqueInputSchema),z.lazy(() => FollowRelationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FollowRelationWhereUniqueInputSchema),z.lazy(() => FollowRelationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FollowRelationWhereUniqueInputSchema),z.lazy(() => FollowRelationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FollowRelationWhereUniqueInputSchema),z.lazy(() => FollowRelationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FollowRelationUpdateWithWhereUniqueWithoutFromInputSchema),z.lazy(() => FollowRelationUpdateWithWhereUniqueWithoutFromInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FollowRelationUpdateManyWithWhereWithoutFromInputSchema),z.lazy(() => FollowRelationUpdateManyWithWhereWithoutFromInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FollowRelationScalarWhereInputSchema),z.lazy(() => FollowRelationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FollowRelationUncheckedUpdateManyWithoutToNestedInputSchema: z.ZodType<Prisma.FollowRelationUncheckedUpdateManyWithoutToNestedInput> = z.object({
  create: z.union([ z.lazy(() => FollowRelationCreateWithoutToInputSchema),z.lazy(() => FollowRelationCreateWithoutToInputSchema).array(),z.lazy(() => FollowRelationUncheckedCreateWithoutToInputSchema),z.lazy(() => FollowRelationUncheckedCreateWithoutToInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FollowRelationCreateOrConnectWithoutToInputSchema),z.lazy(() => FollowRelationCreateOrConnectWithoutToInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FollowRelationUpsertWithWhereUniqueWithoutToInputSchema),z.lazy(() => FollowRelationUpsertWithWhereUniqueWithoutToInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FollowRelationCreateManyToInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FollowRelationWhereUniqueInputSchema),z.lazy(() => FollowRelationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FollowRelationWhereUniqueInputSchema),z.lazy(() => FollowRelationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FollowRelationWhereUniqueInputSchema),z.lazy(() => FollowRelationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FollowRelationWhereUniqueInputSchema),z.lazy(() => FollowRelationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FollowRelationUpdateWithWhereUniqueWithoutToInputSchema),z.lazy(() => FollowRelationUpdateWithWhereUniqueWithoutToInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FollowRelationUpdateManyWithWhereWithoutToInputSchema),z.lazy(() => FollowRelationUpdateManyWithWhereWithoutToInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FollowRelationScalarWhereInputSchema),z.lazy(() => FollowRelationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ChatMessageUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ChatMessageUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChatMessageCreateWithoutUserInputSchema),z.lazy(() => ChatMessageCreateWithoutUserInputSchema).array(),z.lazy(() => ChatMessageUncheckedCreateWithoutUserInputSchema),z.lazy(() => ChatMessageUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatMessageCreateOrConnectWithoutUserInputSchema),z.lazy(() => ChatMessageCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ChatMessageUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ChatMessageUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatMessageCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ChatMessageWhereUniqueInputSchema),z.lazy(() => ChatMessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ChatMessageUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ChatMessageUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ChatMessageUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ChatMessageUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ChatMessageScalarWhereInputSchema),z.lazy(() => ChatMessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ChatMessageActionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ChatMessageActionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChatMessageActionCreateWithoutUserInputSchema),z.lazy(() => ChatMessageActionCreateWithoutUserInputSchema).array(),z.lazy(() => ChatMessageActionUncheckedCreateWithoutUserInputSchema),z.lazy(() => ChatMessageActionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatMessageActionCreateOrConnectWithoutUserInputSchema),z.lazy(() => ChatMessageActionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ChatMessageActionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ChatMessageActionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatMessageActionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ChatMessageActionWhereUniqueInputSchema),z.lazy(() => ChatMessageActionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ChatMessageActionWhereUniqueInputSchema),z.lazy(() => ChatMessageActionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ChatMessageActionWhereUniqueInputSchema),z.lazy(() => ChatMessageActionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ChatMessageActionWhereUniqueInputSchema),z.lazy(() => ChatMessageActionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ChatMessageActionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ChatMessageActionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ChatMessageActionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ChatMessageActionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ChatMessageActionScalarWhereInputSchema),z.lazy(() => ChatMessageActionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AppTagUncheckedUpdateManyWithoutCreatorNestedInputSchema: z.ZodType<Prisma.AppTagUncheckedUpdateManyWithoutCreatorNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppTagCreateWithoutCreatorInputSchema),z.lazy(() => AppTagCreateWithoutCreatorInputSchema).array(),z.lazy(() => AppTagUncheckedCreateWithoutCreatorInputSchema),z.lazy(() => AppTagUncheckedCreateWithoutCreatorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppTagCreateOrConnectWithoutCreatorInputSchema),z.lazy(() => AppTagCreateOrConnectWithoutCreatorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppTagUpsertWithWhereUniqueWithoutCreatorInputSchema),z.lazy(() => AppTagUpsertWithWhereUniqueWithoutCreatorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppTagCreateManyCreatorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AppTagWhereUniqueInputSchema),z.lazy(() => AppTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppTagWhereUniqueInputSchema),z.lazy(() => AppTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppTagWhereUniqueInputSchema),z.lazy(() => AppTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppTagWhereUniqueInputSchema),z.lazy(() => AppTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppTagUpdateWithWhereUniqueWithoutCreatorInputSchema),z.lazy(() => AppTagUpdateWithWhereUniqueWithoutCreatorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppTagUpdateManyWithWhereWithoutCreatorInputSchema),z.lazy(() => AppTagUpdateManyWithWhereWithoutCreatorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppTagScalarWhereInputSchema),z.lazy(() => AppTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AppCommentUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AppCommentUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppCommentCreateWithoutUserInputSchema),z.lazy(() => AppCommentCreateWithoutUserInputSchema).array(),z.lazy(() => AppCommentUncheckedCreateWithoutUserInputSchema),z.lazy(() => AppCommentUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppCommentCreateOrConnectWithoutUserInputSchema),z.lazy(() => AppCommentCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppCommentUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AppCommentUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppCommentCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AppCommentWhereUniqueInputSchema),z.lazy(() => AppCommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppCommentWhereUniqueInputSchema),z.lazy(() => AppCommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppCommentWhereUniqueInputSchema),z.lazy(() => AppCommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppCommentWhereUniqueInputSchema),z.lazy(() => AppCommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppCommentUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AppCommentUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppCommentUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AppCommentUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppCommentScalarWhereInputSchema),z.lazy(() => AppCommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AppActionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AppActionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppActionCreateWithoutUserInputSchema),z.lazy(() => AppActionCreateWithoutUserInputSchema).array(),z.lazy(() => AppActionUncheckedCreateWithoutUserInputSchema),z.lazy(() => AppActionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppActionCreateOrConnectWithoutUserInputSchema),z.lazy(() => AppActionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppActionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AppActionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppActionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AppActionWhereUniqueInputSchema),z.lazy(() => AppActionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppActionWhereUniqueInputSchema),z.lazy(() => AppActionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppActionWhereUniqueInputSchema),z.lazy(() => AppActionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppActionWhereUniqueInputSchema),z.lazy(() => AppActionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppActionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AppActionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppActionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AppActionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppActionScalarWhereInputSchema),z.lazy(() => AppActionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StarringAppUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.StarringAppUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => StarringAppCreateWithoutUserInputSchema),z.lazy(() => StarringAppCreateWithoutUserInputSchema).array(),z.lazy(() => StarringAppUncheckedCreateWithoutUserInputSchema),z.lazy(() => StarringAppUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StarringAppCreateOrConnectWithoutUserInputSchema),z.lazy(() => StarringAppCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StarringAppUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => StarringAppUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StarringAppCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StarringAppWhereUniqueInputSchema),z.lazy(() => StarringAppWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StarringAppWhereUniqueInputSchema),z.lazy(() => StarringAppWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StarringAppWhereUniqueInputSchema),z.lazy(() => StarringAppWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StarringAppWhereUniqueInputSchema),z.lazy(() => StarringAppWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StarringAppUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => StarringAppUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StarringAppUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => StarringAppUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StarringAppScalarWhereInputSchema),z.lazy(() => StarringAppScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AppUncheckedUpdateManyWithoutCreatorNestedInputSchema: z.ZodType<Prisma.AppUncheckedUpdateManyWithoutCreatorNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppCreateWithoutCreatorInputSchema),z.lazy(() => AppCreateWithoutCreatorInputSchema).array(),z.lazy(() => AppUncheckedCreateWithoutCreatorInputSchema),z.lazy(() => AppUncheckedCreateWithoutCreatorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppCreateOrConnectWithoutCreatorInputSchema),z.lazy(() => AppCreateOrConnectWithoutCreatorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppUpsertWithWhereUniqueWithoutCreatorInputSchema),z.lazy(() => AppUpsertWithWhereUniqueWithoutCreatorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppCreateManyCreatorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppWhereUniqueInputSchema),z.lazy(() => AppWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppUpdateWithWhereUniqueWithoutCreatorInputSchema),z.lazy(() => AppUpdateWithWhereUniqueWithoutCreatorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppUpdateManyWithWhereWithoutCreatorInputSchema),z.lazy(() => AppUpdateManyWithWhereWithoutCreatorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppScalarWhereInputSchema),z.lazy(() => AppScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ConversationUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ConversationCreateWithoutUserInputSchema),z.lazy(() => ConversationCreateWithoutUserInputSchema).array(),z.lazy(() => ConversationUncheckedCreateWithoutUserInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConversationCreateOrConnectWithoutUserInputSchema),z.lazy(() => ConversationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ConversationUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ConversationUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConversationCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ConversationUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ConversationUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ConversationUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ConversationUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ConversationScalarWhereInputSchema),z.lazy(() => ConversationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TranscationUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.TranscationUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => TranscationCreateWithoutUserInputSchema),z.lazy(() => TranscationCreateWithoutUserInputSchema).array(),z.lazy(() => TranscationUncheckedCreateWithoutUserInputSchema),z.lazy(() => TranscationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TranscationCreateOrConnectWithoutUserInputSchema),z.lazy(() => TranscationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TranscationUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TranscationUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TranscationCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TranscationWhereUniqueInputSchema),z.lazy(() => TranscationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TranscationWhereUniqueInputSchema),z.lazy(() => TranscationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TranscationWhereUniqueInputSchema),z.lazy(() => TranscationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TranscationWhereUniqueInputSchema),z.lazy(() => TranscationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TranscationUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TranscationUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TranscationUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => TranscationUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TranscationScalarWhereInputSchema),z.lazy(() => TranscationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumPlatformTypeFilterSchema: z.ZodType<Prisma.NestedEnumPlatformTypeFilter> = z.object({
  equals: z.lazy(() => PlatformTypeSchema).optional(),
  in: z.lazy(() => PlatformTypeSchema).array().optional(),
  notIn: z.lazy(() => PlatformTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => NestedEnumPlatformTypeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedEnumPlatformTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumPlatformTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PlatformTypeSchema).optional(),
  in: z.lazy(() => PlatformTypeSchema).array().optional(),
  notIn: z.lazy(() => PlatformTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => NestedEnumPlatformTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPlatformTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPlatformTypeFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedJsonNullableFilterSchema: z.ZodType<Prisma.NestedJsonNullableFilter> = z.object({
  equals: InputJsonValue.optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: InputJsonValue.optional()
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedEnumPromptRoleTypeFilterSchema: z.ZodType<Prisma.NestedEnumPromptRoleTypeFilter> = z.object({
  equals: z.lazy(() => PromptRoleTypeSchema).optional(),
  in: z.lazy(() => PromptRoleTypeSchema).array().optional(),
  notIn: z.lazy(() => PromptRoleTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => PromptRoleTypeSchema),z.lazy(() => NestedEnumPromptRoleTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumChatMessageFormatTypeFilterSchema: z.ZodType<Prisma.NestedEnumChatMessageFormatTypeFilter> = z.object({
  equals: z.lazy(() => ChatMessageFormatTypeSchema).optional(),
  in: z.lazy(() => ChatMessageFormatTypeSchema).array().optional(),
  notIn: z.lazy(() => ChatMessageFormatTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ChatMessageFormatTypeSchema),z.lazy(() => NestedEnumChatMessageFormatTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumPromptRoleTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumPromptRoleTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PromptRoleTypeSchema).optional(),
  in: z.lazy(() => PromptRoleTypeSchema).array().optional(),
  notIn: z.lazy(() => PromptRoleTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => PromptRoleTypeSchema),z.lazy(() => NestedEnumPromptRoleTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPromptRoleTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPromptRoleTypeFilterSchema).optional()
}).strict();

export const NestedEnumChatMessageFormatTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumChatMessageFormatTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ChatMessageFormatTypeSchema).optional(),
  in: z.lazy(() => ChatMessageFormatTypeSchema).array().optional(),
  notIn: z.lazy(() => ChatMessageFormatTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ChatMessageFormatTypeSchema),z.lazy(() => NestedEnumChatMessageFormatTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumChatMessageFormatTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumChatMessageFormatTypeFilterSchema).optional()
}).strict();

export const NestedEnumInvitationStatusFilterSchema: z.ZodType<Prisma.NestedEnumInvitationStatusFilter> = z.object({
  equals: z.lazy(() => InvitationStatusSchema).optional(),
  in: z.lazy(() => InvitationStatusSchema).array().optional(),
  notIn: z.lazy(() => InvitationStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => InvitationStatusSchema),z.lazy(() => NestedEnumInvitationStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumInvitationStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumInvitationStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => InvitationStatusSchema).optional(),
  in: z.lazy(() => InvitationStatusSchema).array().optional(),
  notIn: z.lazy(() => InvitationStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => InvitationStatusSchema),z.lazy(() => NestedEnumInvitationStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumInvitationStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumInvitationStatusFilterSchema).optional()
}).strict();

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  followedByCount: z.number().int().optional(),
  followingCount: z.number().int().optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationCreateNestedManyWithoutFromInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationCreateNestedManyWithoutToInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationCreateNestedManyWithoutFromInputSchema).optional(),
  following: z.lazy(() => FollowRelationCreateNestedManyWithoutToInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageCreateNestedManyWithoutUserInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionCreateNestedManyWithoutUserInputSchema).optional(),
  tags: z.lazy(() => AppTagCreateNestedManyWithoutCreatorInputSchema).optional(),
  appComments: z.lazy(() => AppCommentCreateNestedManyWithoutUserInputSchema).optional(),
  appActions: z.lazy(() => AppActionCreateNestedManyWithoutUserInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppCreateNestedManyWithoutUserInputSchema).optional(),
  createdApps: z.lazy(() => AppCreateNestedManyWithoutCreatorInputSchema).optional(),
  conversations: z.lazy(() => ConversationCreateNestedManyWithoutUserInputSchema).optional(),
  Transcation: z.lazy(() => TranscationCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  followedByCount: z.number().int().optional(),
  followingCount: z.number().int().optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUncheckedCreateNestedManyWithoutFromInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUncheckedCreateNestedManyWithoutToInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUncheckedCreateNestedManyWithoutFromInputSchema).optional(),
  following: z.lazy(() => FollowRelationUncheckedCreateNestedManyWithoutToInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  tags: z.lazy(() => AppTagUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  appActions: z.lazy(() => AppActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdApps: z.lazy(() => AppUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  conversations: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followedByCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUpdateManyWithoutFromNestedInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUpdateManyWithoutToNestedInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUpdateManyWithoutFromNestedInputSchema).optional(),
  following: z.lazy(() => FollowRelationUpdateManyWithoutToNestedInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUpdateManyWithoutUserNestedInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUpdateManyWithoutUserNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUpdateManyWithoutCreatorNestedInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUpdateManyWithoutUserNestedInputSchema).optional(),
  appActions: z.lazy(() => AppActionUpdateManyWithoutUserNestedInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUpdateManyWithoutUserNestedInputSchema).optional(),
  createdApps: z.lazy(() => AppUpdateManyWithoutCreatorNestedInputSchema).optional(),
  conversations: z.lazy(() => ConversationUpdateManyWithoutUserNestedInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followedByCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUncheckedUpdateManyWithoutFromNestedInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUncheckedUpdateManyWithoutToNestedInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUncheckedUpdateManyWithoutFromNestedInputSchema).optional(),
  following: z.lazy(() => FollowRelationUncheckedUpdateManyWithoutToNestedInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  appActions: z.lazy(() => AppActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdApps: z.lazy(() => AppUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  conversations: z.lazy(() => ConversationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutCreatedAppsInputSchema: z.ZodType<Prisma.UserCreateWithoutCreatedAppsInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  followedByCount: z.number().int().optional(),
  followingCount: z.number().int().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationCreateNestedManyWithoutFromInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationCreateNestedManyWithoutToInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationCreateNestedManyWithoutFromInputSchema).optional(),
  following: z.lazy(() => FollowRelationCreateNestedManyWithoutToInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageCreateNestedManyWithoutUserInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionCreateNestedManyWithoutUserInputSchema).optional(),
  tags: z.lazy(() => AppTagCreateNestedManyWithoutCreatorInputSchema).optional(),
  appComments: z.lazy(() => AppCommentCreateNestedManyWithoutUserInputSchema).optional(),
  appActions: z.lazy(() => AppActionCreateNestedManyWithoutUserInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppCreateNestedManyWithoutUserInputSchema).optional(),
  conversations: z.lazy(() => ConversationCreateNestedManyWithoutUserInputSchema).optional(),
  Transcation: z.lazy(() => TranscationCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutCreatedAppsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCreatedAppsInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  followedByCount: z.number().int().optional(),
  followingCount: z.number().int().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUncheckedCreateNestedManyWithoutFromInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUncheckedCreateNestedManyWithoutToInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUncheckedCreateNestedManyWithoutFromInputSchema).optional(),
  following: z.lazy(() => FollowRelationUncheckedCreateNestedManyWithoutToInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  tags: z.lazy(() => AppTagUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  appActions: z.lazy(() => AppActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  conversations: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutCreatedAppsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCreatedAppsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedAppsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedAppsInputSchema) ]),
}).strict();

export const AppTagCreateWithoutAppsInputSchema: z.ZodType<Prisma.AppTagCreateWithoutAppsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  name: z.string(),
  creator: z.lazy(() => UserCreateNestedOneWithoutTagsInputSchema).optional()
}).strict();

export const AppTagUncheckedCreateWithoutAppsInputSchema: z.ZodType<Prisma.AppTagUncheckedCreateWithoutAppsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  creatorId: z.string().optional().nullable(),
  name: z.string()
}).strict();

export const AppTagCreateOrConnectWithoutAppsInputSchema: z.ZodType<Prisma.AppTagCreateOrConnectWithoutAppsInput> = z.object({
  where: z.lazy(() => AppTagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AppTagCreateWithoutAppsInputSchema),z.lazy(() => AppTagUncheckedCreateWithoutAppsInputSchema) ]),
}).strict();

export const AppCategoryCreateWithoutAppInputSchema: z.ZodType<Prisma.AppCategoryCreateWithoutAppInput> = z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  main: z.number().int(),
  sub: z.number().int()
}).strict();

export const AppCategoryUncheckedCreateWithoutAppInputSchema: z.ZodType<Prisma.AppCategoryUncheckedCreateWithoutAppInput> = z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  main: z.number().int(),
  sub: z.number().int()
}).strict();

export const AppCategoryCreateOrConnectWithoutAppInputSchema: z.ZodType<Prisma.AppCategoryCreateOrConnectWithoutAppInput> = z.object({
  where: z.lazy(() => AppCategoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AppCategoryCreateWithoutAppInputSchema),z.lazy(() => AppCategoryUncheckedCreateWithoutAppInputSchema) ]),
}).strict();

export const AppActionCreateWithoutAppInputSchema: z.ZodType<Prisma.AppActionCreateWithoutAppInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  action: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutAppActionsInputSchema).optional()
}).strict();

export const AppActionUncheckedCreateWithoutAppInputSchema: z.ZodType<Prisma.AppActionUncheckedCreateWithoutAppInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  userId: z.string().optional().nullable(),
  action: z.string()
}).strict();

export const AppActionCreateOrConnectWithoutAppInputSchema: z.ZodType<Prisma.AppActionCreateOrConnectWithoutAppInput> = z.object({
  where: z.lazy(() => AppActionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AppActionCreateWithoutAppInputSchema),z.lazy(() => AppActionUncheckedCreateWithoutAppInputSchema) ]),
}).strict();

export const AppActionCreateManyAppInputEnvelopeSchema: z.ZodType<Prisma.AppActionCreateManyAppInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AppActionCreateManyAppInputSchema),z.lazy(() => AppActionCreateManyAppInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ConversationCreateWithoutAppInputSchema: z.ZodType<Prisma.ConversationCreateWithoutAppInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isActive: z.boolean().optional(),
  pinned: z.boolean().optional(),
  messages: z.lazy(() => ChatMessageCreateNestedManyWithoutConversationInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutConversationsInputSchema)
}).strict();

export const ConversationUncheckedCreateWithoutAppInputSchema: z.ZodType<Prisma.ConversationUncheckedCreateWithoutAppInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isActive: z.boolean().optional(),
  userId: z.string(),
  pinned: z.boolean().optional(),
  messages: z.lazy(() => ChatMessageUncheckedCreateNestedManyWithoutConversationInputSchema).optional()
}).strict();

export const ConversationCreateOrConnectWithoutAppInputSchema: z.ZodType<Prisma.ConversationCreateOrConnectWithoutAppInput> = z.object({
  where: z.lazy(() => ConversationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ConversationCreateWithoutAppInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutAppInputSchema) ]),
}).strict();

export const ConversationCreateManyAppInputEnvelopeSchema: z.ZodType<Prisma.ConversationCreateManyAppInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ConversationCreateManyAppInputSchema),z.lazy(() => ConversationCreateManyAppInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const StarringAppCreateWithoutAppInputSchema: z.ZodType<Prisma.StarringAppCreateWithoutAppInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isActive: z.boolean().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutStarringAppInputSchema)
}).strict();

export const StarringAppUncheckedCreateWithoutAppInputSchema: z.ZodType<Prisma.StarringAppUncheckedCreateWithoutAppInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isActive: z.boolean().optional(),
  userId: z.string()
}).strict();

export const StarringAppCreateOrConnectWithoutAppInputSchema: z.ZodType<Prisma.StarringAppCreateOrConnectWithoutAppInput> = z.object({
  where: z.lazy(() => StarringAppWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StarringAppCreateWithoutAppInputSchema),z.lazy(() => StarringAppUncheckedCreateWithoutAppInputSchema) ]),
}).strict();

export const StarringAppCreateManyAppInputEnvelopeSchema: z.ZodType<Prisma.StarringAppCreateManyAppInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => StarringAppCreateManyAppInputSchema),z.lazy(() => StarringAppCreateManyAppInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AppCommentCreateWithoutAAppInputSchema: z.ZodType<Prisma.AppCommentCreateWithoutAAppInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  title: z.string().optional().nullable(),
  content: z.string(),
  rate: z.number().int().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutAppCommentsInputSchema)
}).strict();

export const AppCommentUncheckedCreateWithoutAAppInputSchema: z.ZodType<Prisma.AppCommentUncheckedCreateWithoutAAppInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  title: z.string().optional().nullable(),
  content: z.string(),
  rate: z.number().int().optional().nullable()
}).strict();

export const AppCommentCreateOrConnectWithoutAAppInputSchema: z.ZodType<Prisma.AppCommentCreateOrConnectWithoutAAppInput> = z.object({
  where: z.lazy(() => AppCommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AppCommentCreateWithoutAAppInputSchema),z.lazy(() => AppCommentUncheckedCreateWithoutAAppInputSchema) ]),
}).strict();

export const AppCommentCreateManyAAppInputEnvelopeSchema: z.ZodType<Prisma.AppCommentCreateManyAAppInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AppCommentCreateManyAAppInputSchema),z.lazy(() => AppCommentCreateManyAAppInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AppStateCreateWithoutAppInputSchema: z.ZodType<Prisma.AppStateCreateWithoutAppInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  views: z.number().int().optional(),
  stars: z.number().int().optional(),
  forks: z.number().int().optional(),
  tips: z.number().optional(),
  calls: z.number().int().optional(),
  shares: z.number().int().optional()
}).strict();

export const AppStateUncheckedCreateWithoutAppInputSchema: z.ZodType<Prisma.AppStateUncheckedCreateWithoutAppInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  views: z.number().int().optional(),
  stars: z.number().int().optional(),
  forks: z.number().int().optional(),
  tips: z.number().optional(),
  calls: z.number().int().optional(),
  shares: z.number().int().optional()
}).strict();

export const AppStateCreateOrConnectWithoutAppInputSchema: z.ZodType<Prisma.AppStateCreateOrConnectWithoutAppInput> = z.object({
  where: z.lazy(() => AppStateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AppStateCreateWithoutAppInputSchema),z.lazy(() => AppStateUncheckedCreateWithoutAppInputSchema) ]),
}).strict();

export const UserUpsertWithoutCreatedAppsInputSchema: z.ZodType<Prisma.UserUpsertWithoutCreatedAppsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCreatedAppsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCreatedAppsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedAppsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedAppsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutCreatedAppsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCreatedAppsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutCreatedAppsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCreatedAppsInputSchema) ]),
}).strict();

export const UserUpdateWithoutCreatedAppsInputSchema: z.ZodType<Prisma.UserUpdateWithoutCreatedAppsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followedByCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUpdateManyWithoutFromNestedInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUpdateManyWithoutToNestedInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUpdateManyWithoutFromNestedInputSchema).optional(),
  following: z.lazy(() => FollowRelationUpdateManyWithoutToNestedInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUpdateManyWithoutUserNestedInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUpdateManyWithoutUserNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUpdateManyWithoutCreatorNestedInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUpdateManyWithoutUserNestedInputSchema).optional(),
  appActions: z.lazy(() => AppActionUpdateManyWithoutUserNestedInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUpdateManyWithoutUserNestedInputSchema).optional(),
  conversations: z.lazy(() => ConversationUpdateManyWithoutUserNestedInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutCreatedAppsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCreatedAppsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followedByCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUncheckedUpdateManyWithoutFromNestedInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUncheckedUpdateManyWithoutToNestedInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUncheckedUpdateManyWithoutFromNestedInputSchema).optional(),
  following: z.lazy(() => FollowRelationUncheckedUpdateManyWithoutToNestedInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  appActions: z.lazy(() => AppActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  conversations: z.lazy(() => ConversationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const AppTagUpsertWithWhereUniqueWithoutAppsInputSchema: z.ZodType<Prisma.AppTagUpsertWithWhereUniqueWithoutAppsInput> = z.object({
  where: z.lazy(() => AppTagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AppTagUpdateWithoutAppsInputSchema),z.lazy(() => AppTagUncheckedUpdateWithoutAppsInputSchema) ]),
  create: z.union([ z.lazy(() => AppTagCreateWithoutAppsInputSchema),z.lazy(() => AppTagUncheckedCreateWithoutAppsInputSchema) ]),
}).strict();

export const AppTagUpdateWithWhereUniqueWithoutAppsInputSchema: z.ZodType<Prisma.AppTagUpdateWithWhereUniqueWithoutAppsInput> = z.object({
  where: z.lazy(() => AppTagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AppTagUpdateWithoutAppsInputSchema),z.lazy(() => AppTagUncheckedUpdateWithoutAppsInputSchema) ]),
}).strict();

export const AppTagUpdateManyWithWhereWithoutAppsInputSchema: z.ZodType<Prisma.AppTagUpdateManyWithWhereWithoutAppsInput> = z.object({
  where: z.lazy(() => AppTagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AppTagUpdateManyMutationInputSchema),z.lazy(() => AppTagUncheckedUpdateManyWithoutAppsInputSchema) ]),
}).strict();

export const AppTagScalarWhereInputSchema: z.ZodType<Prisma.AppTagScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AppTagScalarWhereInputSchema),z.lazy(() => AppTagScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppTagScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppTagScalarWhereInputSchema),z.lazy(() => AppTagScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  creatorId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const AppCategoryUpsertWithoutAppInputSchema: z.ZodType<Prisma.AppCategoryUpsertWithoutAppInput> = z.object({
  update: z.union([ z.lazy(() => AppCategoryUpdateWithoutAppInputSchema),z.lazy(() => AppCategoryUncheckedUpdateWithoutAppInputSchema) ]),
  create: z.union([ z.lazy(() => AppCategoryCreateWithoutAppInputSchema),z.lazy(() => AppCategoryUncheckedCreateWithoutAppInputSchema) ]),
  where: z.lazy(() => AppCategoryWhereInputSchema).optional()
}).strict();

export const AppCategoryUpdateToOneWithWhereWithoutAppInputSchema: z.ZodType<Prisma.AppCategoryUpdateToOneWithWhereWithoutAppInput> = z.object({
  where: z.lazy(() => AppCategoryWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AppCategoryUpdateWithoutAppInputSchema),z.lazy(() => AppCategoryUncheckedUpdateWithoutAppInputSchema) ]),
}).strict();

export const AppCategoryUpdateWithoutAppInputSchema: z.ZodType<Prisma.AppCategoryUpdateWithoutAppInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  main: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sub: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AppCategoryUncheckedUpdateWithoutAppInputSchema: z.ZodType<Prisma.AppCategoryUncheckedUpdateWithoutAppInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  main: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sub: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AppActionUpsertWithWhereUniqueWithoutAppInputSchema: z.ZodType<Prisma.AppActionUpsertWithWhereUniqueWithoutAppInput> = z.object({
  where: z.lazy(() => AppActionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AppActionUpdateWithoutAppInputSchema),z.lazy(() => AppActionUncheckedUpdateWithoutAppInputSchema) ]),
  create: z.union([ z.lazy(() => AppActionCreateWithoutAppInputSchema),z.lazy(() => AppActionUncheckedCreateWithoutAppInputSchema) ]),
}).strict();

export const AppActionUpdateWithWhereUniqueWithoutAppInputSchema: z.ZodType<Prisma.AppActionUpdateWithWhereUniqueWithoutAppInput> = z.object({
  where: z.lazy(() => AppActionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AppActionUpdateWithoutAppInputSchema),z.lazy(() => AppActionUncheckedUpdateWithoutAppInputSchema) ]),
}).strict();

export const AppActionUpdateManyWithWhereWithoutAppInputSchema: z.ZodType<Prisma.AppActionUpdateManyWithWhereWithoutAppInput> = z.object({
  where: z.lazy(() => AppActionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AppActionUpdateManyMutationInputSchema),z.lazy(() => AppActionUncheckedUpdateManyWithoutAppInputSchema) ]),
}).strict();

export const AppActionScalarWhereInputSchema: z.ZodType<Prisma.AppActionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AppActionScalarWhereInputSchema),z.lazy(() => AppActionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppActionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppActionScalarWhereInputSchema),z.lazy(() => AppActionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  appId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  action: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const ConversationUpsertWithWhereUniqueWithoutAppInputSchema: z.ZodType<Prisma.ConversationUpsertWithWhereUniqueWithoutAppInput> = z.object({
  where: z.lazy(() => ConversationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ConversationUpdateWithoutAppInputSchema),z.lazy(() => ConversationUncheckedUpdateWithoutAppInputSchema) ]),
  create: z.union([ z.lazy(() => ConversationCreateWithoutAppInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutAppInputSchema) ]),
}).strict();

export const ConversationUpdateWithWhereUniqueWithoutAppInputSchema: z.ZodType<Prisma.ConversationUpdateWithWhereUniqueWithoutAppInput> = z.object({
  where: z.lazy(() => ConversationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ConversationUpdateWithoutAppInputSchema),z.lazy(() => ConversationUncheckedUpdateWithoutAppInputSchema) ]),
}).strict();

export const ConversationUpdateManyWithWhereWithoutAppInputSchema: z.ZodType<Prisma.ConversationUpdateManyWithWhereWithoutAppInput> = z.object({
  where: z.lazy(() => ConversationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ConversationUpdateManyMutationInputSchema),z.lazy(() => ConversationUncheckedUpdateManyWithoutAppInputSchema) ]),
}).strict();

export const ConversationScalarWhereInputSchema: z.ZodType<Prisma.ConversationScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ConversationScalarWhereInputSchema),z.lazy(() => ConversationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ConversationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ConversationScalarWhereInputSchema),z.lazy(() => ConversationScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  appId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pinned: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
}).strict();

export const StarringAppUpsertWithWhereUniqueWithoutAppInputSchema: z.ZodType<Prisma.StarringAppUpsertWithWhereUniqueWithoutAppInput> = z.object({
  where: z.lazy(() => StarringAppWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => StarringAppUpdateWithoutAppInputSchema),z.lazy(() => StarringAppUncheckedUpdateWithoutAppInputSchema) ]),
  create: z.union([ z.lazy(() => StarringAppCreateWithoutAppInputSchema),z.lazy(() => StarringAppUncheckedCreateWithoutAppInputSchema) ]),
}).strict();

export const StarringAppUpdateWithWhereUniqueWithoutAppInputSchema: z.ZodType<Prisma.StarringAppUpdateWithWhereUniqueWithoutAppInput> = z.object({
  where: z.lazy(() => StarringAppWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => StarringAppUpdateWithoutAppInputSchema),z.lazy(() => StarringAppUncheckedUpdateWithoutAppInputSchema) ]),
}).strict();

export const StarringAppUpdateManyWithWhereWithoutAppInputSchema: z.ZodType<Prisma.StarringAppUpdateManyWithWhereWithoutAppInput> = z.object({
  where: z.lazy(() => StarringAppScalarWhereInputSchema),
  data: z.union([ z.lazy(() => StarringAppUpdateManyMutationInputSchema),z.lazy(() => StarringAppUncheckedUpdateManyWithoutAppInputSchema) ]),
}).strict();

export const StarringAppScalarWhereInputSchema: z.ZodType<Prisma.StarringAppScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => StarringAppScalarWhereInputSchema),z.lazy(() => StarringAppScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StarringAppScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StarringAppScalarWhereInputSchema),z.lazy(() => StarringAppScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  appId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const AppCommentUpsertWithWhereUniqueWithoutAAppInputSchema: z.ZodType<Prisma.AppCommentUpsertWithWhereUniqueWithoutAAppInput> = z.object({
  where: z.lazy(() => AppCommentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AppCommentUpdateWithoutAAppInputSchema),z.lazy(() => AppCommentUncheckedUpdateWithoutAAppInputSchema) ]),
  create: z.union([ z.lazy(() => AppCommentCreateWithoutAAppInputSchema),z.lazy(() => AppCommentUncheckedCreateWithoutAAppInputSchema) ]),
}).strict();

export const AppCommentUpdateWithWhereUniqueWithoutAAppInputSchema: z.ZodType<Prisma.AppCommentUpdateWithWhereUniqueWithoutAAppInput> = z.object({
  where: z.lazy(() => AppCommentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AppCommentUpdateWithoutAAppInputSchema),z.lazy(() => AppCommentUncheckedUpdateWithoutAAppInputSchema) ]),
}).strict();

export const AppCommentUpdateManyWithWhereWithoutAAppInputSchema: z.ZodType<Prisma.AppCommentUpdateManyWithWhereWithoutAAppInput> = z.object({
  where: z.lazy(() => AppCommentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AppCommentUpdateManyMutationInputSchema),z.lazy(() => AppCommentUncheckedUpdateManyWithoutAAppInputSchema) ]),
}).strict();

export const AppCommentScalarWhereInputSchema: z.ZodType<Prisma.AppCommentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AppCommentScalarWhereInputSchema),z.lazy(() => AppCommentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppCommentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppCommentScalarWhereInputSchema),z.lazy(() => AppCommentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  appId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rate: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const AppStateUpsertWithoutAppInputSchema: z.ZodType<Prisma.AppStateUpsertWithoutAppInput> = z.object({
  update: z.union([ z.lazy(() => AppStateUpdateWithoutAppInputSchema),z.lazy(() => AppStateUncheckedUpdateWithoutAppInputSchema) ]),
  create: z.union([ z.lazy(() => AppStateCreateWithoutAppInputSchema),z.lazy(() => AppStateUncheckedCreateWithoutAppInputSchema) ]),
  where: z.lazy(() => AppStateWhereInputSchema).optional()
}).strict();

export const AppStateUpdateToOneWithWhereWithoutAppInputSchema: z.ZodType<Prisma.AppStateUpdateToOneWithWhereWithoutAppInput> = z.object({
  where: z.lazy(() => AppStateWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AppStateUpdateWithoutAppInputSchema),z.lazy(() => AppStateUncheckedUpdateWithoutAppInputSchema) ]),
}).strict();

export const AppStateUpdateWithoutAppInputSchema: z.ZodType<Prisma.AppStateUpdateWithoutAppInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  stars: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  forks: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tips: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  calls: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  shares: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AppStateUncheckedUpdateWithoutAppInputSchema: z.ZodType<Prisma.AppStateUncheckedUpdateWithoutAppInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  stars: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  forks: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tips: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  calls: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  shares: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateWithoutAppActionsInputSchema: z.ZodType<Prisma.UserCreateWithoutAppActionsInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  followedByCount: z.number().int().optional(),
  followingCount: z.number().int().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationCreateNestedManyWithoutFromInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationCreateNestedManyWithoutToInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationCreateNestedManyWithoutFromInputSchema).optional(),
  following: z.lazy(() => FollowRelationCreateNestedManyWithoutToInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageCreateNestedManyWithoutUserInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionCreateNestedManyWithoutUserInputSchema).optional(),
  tags: z.lazy(() => AppTagCreateNestedManyWithoutCreatorInputSchema).optional(),
  appComments: z.lazy(() => AppCommentCreateNestedManyWithoutUserInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppCreateNestedManyWithoutUserInputSchema).optional(),
  createdApps: z.lazy(() => AppCreateNestedManyWithoutCreatorInputSchema).optional(),
  conversations: z.lazy(() => ConversationCreateNestedManyWithoutUserInputSchema).optional(),
  Transcation: z.lazy(() => TranscationCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAppActionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAppActionsInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  followedByCount: z.number().int().optional(),
  followingCount: z.number().int().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUncheckedCreateNestedManyWithoutFromInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUncheckedCreateNestedManyWithoutToInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUncheckedCreateNestedManyWithoutFromInputSchema).optional(),
  following: z.lazy(() => FollowRelationUncheckedCreateNestedManyWithoutToInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  tags: z.lazy(() => AppTagUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdApps: z.lazy(() => AppUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  conversations: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAppActionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAppActionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAppActionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAppActionsInputSchema) ]),
}).strict();

export const AppCreateWithoutActionsInputSchema: z.ZodType<Prisma.AppCreateWithoutActionsInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  avatar: z.string(),
  desc: z.string(),
  language: z.string().optional(),
  version: z.string().optional(),
  modelName: z.string(),
  isOpenSource: z.boolean().optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  creator: z.lazy(() => UserCreateNestedOneWithoutCreatedAppsInputSchema),
  tags: z.lazy(() => AppTagCreateNestedManyWithoutAppsInputSchema).optional(),
  category: z.lazy(() => AppCategoryCreateNestedOneWithoutAppInputSchema),
  using: z.lazy(() => ConversationCreateNestedManyWithoutAppInputSchema).optional(),
  starring: z.lazy(() => StarringAppCreateNestedManyWithoutAppInputSchema).optional(),
  comments: z.lazy(() => AppCommentCreateNestedManyWithoutAAppInputSchema).optional(),
  state: z.lazy(() => AppStateCreateNestedOneWithoutAppInputSchema).optional()
}).strict();

export const AppUncheckedCreateWithoutActionsInputSchema: z.ZodType<Prisma.AppUncheckedCreateWithoutActionsInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  creatorId: z.string(),
  name: z.string(),
  avatar: z.string(),
  desc: z.string(),
  language: z.string().optional(),
  version: z.string().optional(),
  categoryMain: z.number().int(),
  categorySub: z.number().int(),
  modelName: z.string(),
  isOpenSource: z.boolean().optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  tags: z.lazy(() => AppTagUncheckedCreateNestedManyWithoutAppsInputSchema).optional(),
  using: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutAppInputSchema).optional(),
  starring: z.lazy(() => StarringAppUncheckedCreateNestedManyWithoutAppInputSchema).optional(),
  comments: z.lazy(() => AppCommentUncheckedCreateNestedManyWithoutAAppInputSchema).optional(),
  state: z.lazy(() => AppStateUncheckedCreateNestedOneWithoutAppInputSchema).optional()
}).strict();

export const AppCreateOrConnectWithoutActionsInputSchema: z.ZodType<Prisma.AppCreateOrConnectWithoutActionsInput> = z.object({
  where: z.lazy(() => AppWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AppCreateWithoutActionsInputSchema),z.lazy(() => AppUncheckedCreateWithoutActionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutAppActionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAppActionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAppActionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAppActionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAppActionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAppActionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAppActionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAppActionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAppActionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAppActionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutAppActionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAppActionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followedByCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUpdateManyWithoutFromNestedInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUpdateManyWithoutToNestedInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUpdateManyWithoutFromNestedInputSchema).optional(),
  following: z.lazy(() => FollowRelationUpdateManyWithoutToNestedInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUpdateManyWithoutUserNestedInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUpdateManyWithoutUserNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUpdateManyWithoutCreatorNestedInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUpdateManyWithoutUserNestedInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUpdateManyWithoutUserNestedInputSchema).optional(),
  createdApps: z.lazy(() => AppUpdateManyWithoutCreatorNestedInputSchema).optional(),
  conversations: z.lazy(() => ConversationUpdateManyWithoutUserNestedInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAppActionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAppActionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followedByCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUncheckedUpdateManyWithoutFromNestedInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUncheckedUpdateManyWithoutToNestedInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUncheckedUpdateManyWithoutFromNestedInputSchema).optional(),
  following: z.lazy(() => FollowRelationUncheckedUpdateManyWithoutToNestedInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdApps: z.lazy(() => AppUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  conversations: z.lazy(() => ConversationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const AppUpsertWithoutActionsInputSchema: z.ZodType<Prisma.AppUpsertWithoutActionsInput> = z.object({
  update: z.union([ z.lazy(() => AppUpdateWithoutActionsInputSchema),z.lazy(() => AppUncheckedUpdateWithoutActionsInputSchema) ]),
  create: z.union([ z.lazy(() => AppCreateWithoutActionsInputSchema),z.lazy(() => AppUncheckedCreateWithoutActionsInputSchema) ]),
  where: z.lazy(() => AppWhereInputSchema).optional()
}).strict();

export const AppUpdateToOneWithWhereWithoutActionsInputSchema: z.ZodType<Prisma.AppUpdateToOneWithWhereWithoutActionsInput> = z.object({
  where: z.lazy(() => AppWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AppUpdateWithoutActionsInputSchema),z.lazy(() => AppUncheckedUpdateWithoutActionsInputSchema) ]),
}).strict();

export const AppUpdateWithoutActionsInputSchema: z.ZodType<Prisma.AppUpdateWithoutActionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modelName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isOpenSource: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  creator: z.lazy(() => UserUpdateOneRequiredWithoutCreatedAppsNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUpdateManyWithoutAppsNestedInputSchema).optional(),
  category: z.lazy(() => AppCategoryUpdateOneRequiredWithoutAppNestedInputSchema).optional(),
  using: z.lazy(() => ConversationUpdateManyWithoutAppNestedInputSchema).optional(),
  starring: z.lazy(() => StarringAppUpdateManyWithoutAppNestedInputSchema).optional(),
  comments: z.lazy(() => AppCommentUpdateManyWithoutAAppNestedInputSchema).optional(),
  state: z.lazy(() => AppStateUpdateOneWithoutAppNestedInputSchema).optional()
}).strict();

export const AppUncheckedUpdateWithoutActionsInputSchema: z.ZodType<Prisma.AppUncheckedUpdateWithoutActionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  creatorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryMain: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  categorySub: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  modelName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isOpenSource: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  tags: z.lazy(() => AppTagUncheckedUpdateManyWithoutAppsNestedInputSchema).optional(),
  using: z.lazy(() => ConversationUncheckedUpdateManyWithoutAppNestedInputSchema).optional(),
  starring: z.lazy(() => StarringAppUncheckedUpdateManyWithoutAppNestedInputSchema).optional(),
  comments: z.lazy(() => AppCommentUncheckedUpdateManyWithoutAAppNestedInputSchema).optional(),
  state: z.lazy(() => AppStateUncheckedUpdateOneWithoutAppNestedInputSchema).optional()
}).strict();

export const AppCreateWithoutCategoryInputSchema: z.ZodType<Prisma.AppCreateWithoutCategoryInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  avatar: z.string(),
  desc: z.string(),
  language: z.string().optional(),
  version: z.string().optional(),
  modelName: z.string(),
  isOpenSource: z.boolean().optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  creator: z.lazy(() => UserCreateNestedOneWithoutCreatedAppsInputSchema),
  tags: z.lazy(() => AppTagCreateNestedManyWithoutAppsInputSchema).optional(),
  actions: z.lazy(() => AppActionCreateNestedManyWithoutAppInputSchema).optional(),
  using: z.lazy(() => ConversationCreateNestedManyWithoutAppInputSchema).optional(),
  starring: z.lazy(() => StarringAppCreateNestedManyWithoutAppInputSchema).optional(),
  comments: z.lazy(() => AppCommentCreateNestedManyWithoutAAppInputSchema).optional(),
  state: z.lazy(() => AppStateCreateNestedOneWithoutAppInputSchema).optional()
}).strict();

export const AppUncheckedCreateWithoutCategoryInputSchema: z.ZodType<Prisma.AppUncheckedCreateWithoutCategoryInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  creatorId: z.string(),
  name: z.string(),
  avatar: z.string(),
  desc: z.string(),
  language: z.string().optional(),
  version: z.string().optional(),
  modelName: z.string(),
  isOpenSource: z.boolean().optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  tags: z.lazy(() => AppTagUncheckedCreateNestedManyWithoutAppsInputSchema).optional(),
  actions: z.lazy(() => AppActionUncheckedCreateNestedManyWithoutAppInputSchema).optional(),
  using: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutAppInputSchema).optional(),
  starring: z.lazy(() => StarringAppUncheckedCreateNestedManyWithoutAppInputSchema).optional(),
  comments: z.lazy(() => AppCommentUncheckedCreateNestedManyWithoutAAppInputSchema).optional(),
  state: z.lazy(() => AppStateUncheckedCreateNestedOneWithoutAppInputSchema).optional()
}).strict();

export const AppCreateOrConnectWithoutCategoryInputSchema: z.ZodType<Prisma.AppCreateOrConnectWithoutCategoryInput> = z.object({
  where: z.lazy(() => AppWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AppCreateWithoutCategoryInputSchema),z.lazy(() => AppUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const AppCreateManyCategoryInputEnvelopeSchema: z.ZodType<Prisma.AppCreateManyCategoryInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AppCreateManyCategoryInputSchema),z.lazy(() => AppCreateManyCategoryInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AppUpsertWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.AppUpsertWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => AppWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AppUpdateWithoutCategoryInputSchema),z.lazy(() => AppUncheckedUpdateWithoutCategoryInputSchema) ]),
  create: z.union([ z.lazy(() => AppCreateWithoutCategoryInputSchema),z.lazy(() => AppUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const AppUpdateWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.AppUpdateWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => AppWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AppUpdateWithoutCategoryInputSchema),z.lazy(() => AppUncheckedUpdateWithoutCategoryInputSchema) ]),
}).strict();

export const AppUpdateManyWithWhereWithoutCategoryInputSchema: z.ZodType<Prisma.AppUpdateManyWithWhereWithoutCategoryInput> = z.object({
  where: z.lazy(() => AppScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AppUpdateManyMutationInputSchema),z.lazy(() => AppUncheckedUpdateManyWithoutCategoryInputSchema) ]),
}).strict();

export const AppScalarWhereInputSchema: z.ZodType<Prisma.AppScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AppScalarWhereInputSchema),z.lazy(() => AppScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppScalarWhereInputSchema),z.lazy(() => AppScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  platformType: z.union([ z.lazy(() => EnumPlatformTypeFilterSchema),z.lazy(() => PlatformTypeSchema) ]).optional(),
  platformId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  creatorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  avatar: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  desc: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  language: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  version: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  categoryMain: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  categorySub: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  modelName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isOpenSource: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  modelArgs: z.lazy(() => JsonNullableFilterSchema).optional()
}).strict();

export const UserCreateWithoutAppCommentsInputSchema: z.ZodType<Prisma.UserCreateWithoutAppCommentsInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  followedByCount: z.number().int().optional(),
  followingCount: z.number().int().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationCreateNestedManyWithoutFromInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationCreateNestedManyWithoutToInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationCreateNestedManyWithoutFromInputSchema).optional(),
  following: z.lazy(() => FollowRelationCreateNestedManyWithoutToInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageCreateNestedManyWithoutUserInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionCreateNestedManyWithoutUserInputSchema).optional(),
  tags: z.lazy(() => AppTagCreateNestedManyWithoutCreatorInputSchema).optional(),
  appActions: z.lazy(() => AppActionCreateNestedManyWithoutUserInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppCreateNestedManyWithoutUserInputSchema).optional(),
  createdApps: z.lazy(() => AppCreateNestedManyWithoutCreatorInputSchema).optional(),
  conversations: z.lazy(() => ConversationCreateNestedManyWithoutUserInputSchema).optional(),
  Transcation: z.lazy(() => TranscationCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAppCommentsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAppCommentsInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  followedByCount: z.number().int().optional(),
  followingCount: z.number().int().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUncheckedCreateNestedManyWithoutFromInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUncheckedCreateNestedManyWithoutToInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUncheckedCreateNestedManyWithoutFromInputSchema).optional(),
  following: z.lazy(() => FollowRelationUncheckedCreateNestedManyWithoutToInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  tags: z.lazy(() => AppTagUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  appActions: z.lazy(() => AppActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdApps: z.lazy(() => AppUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  conversations: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAppCommentsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAppCommentsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAppCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAppCommentsInputSchema) ]),
}).strict();

export const AppCreateWithoutCommentsInputSchema: z.ZodType<Prisma.AppCreateWithoutCommentsInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  avatar: z.string(),
  desc: z.string(),
  language: z.string().optional(),
  version: z.string().optional(),
  modelName: z.string(),
  isOpenSource: z.boolean().optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  creator: z.lazy(() => UserCreateNestedOneWithoutCreatedAppsInputSchema),
  tags: z.lazy(() => AppTagCreateNestedManyWithoutAppsInputSchema).optional(),
  category: z.lazy(() => AppCategoryCreateNestedOneWithoutAppInputSchema),
  actions: z.lazy(() => AppActionCreateNestedManyWithoutAppInputSchema).optional(),
  using: z.lazy(() => ConversationCreateNestedManyWithoutAppInputSchema).optional(),
  starring: z.lazy(() => StarringAppCreateNestedManyWithoutAppInputSchema).optional(),
  state: z.lazy(() => AppStateCreateNestedOneWithoutAppInputSchema).optional()
}).strict();

export const AppUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.AppUncheckedCreateWithoutCommentsInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  creatorId: z.string(),
  name: z.string(),
  avatar: z.string(),
  desc: z.string(),
  language: z.string().optional(),
  version: z.string().optional(),
  categoryMain: z.number().int(),
  categorySub: z.number().int(),
  modelName: z.string(),
  isOpenSource: z.boolean().optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  tags: z.lazy(() => AppTagUncheckedCreateNestedManyWithoutAppsInputSchema).optional(),
  actions: z.lazy(() => AppActionUncheckedCreateNestedManyWithoutAppInputSchema).optional(),
  using: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutAppInputSchema).optional(),
  starring: z.lazy(() => StarringAppUncheckedCreateNestedManyWithoutAppInputSchema).optional(),
  state: z.lazy(() => AppStateUncheckedCreateNestedOneWithoutAppInputSchema).optional()
}).strict();

export const AppCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.AppCreateOrConnectWithoutCommentsInput> = z.object({
  where: z.lazy(() => AppWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AppCreateWithoutCommentsInputSchema),z.lazy(() => AppUncheckedCreateWithoutCommentsInputSchema) ]),
}).strict();

export const UserUpsertWithoutAppCommentsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAppCommentsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAppCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAppCommentsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAppCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAppCommentsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAppCommentsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAppCommentsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAppCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAppCommentsInputSchema) ]),
}).strict();

export const UserUpdateWithoutAppCommentsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAppCommentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followedByCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUpdateManyWithoutFromNestedInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUpdateManyWithoutToNestedInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUpdateManyWithoutFromNestedInputSchema).optional(),
  following: z.lazy(() => FollowRelationUpdateManyWithoutToNestedInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUpdateManyWithoutUserNestedInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUpdateManyWithoutUserNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUpdateManyWithoutCreatorNestedInputSchema).optional(),
  appActions: z.lazy(() => AppActionUpdateManyWithoutUserNestedInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUpdateManyWithoutUserNestedInputSchema).optional(),
  createdApps: z.lazy(() => AppUpdateManyWithoutCreatorNestedInputSchema).optional(),
  conversations: z.lazy(() => ConversationUpdateManyWithoutUserNestedInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAppCommentsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAppCommentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followedByCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUncheckedUpdateManyWithoutFromNestedInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUncheckedUpdateManyWithoutToNestedInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUncheckedUpdateManyWithoutFromNestedInputSchema).optional(),
  following: z.lazy(() => FollowRelationUncheckedUpdateManyWithoutToNestedInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  appActions: z.lazy(() => AppActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdApps: z.lazy(() => AppUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  conversations: z.lazy(() => ConversationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const AppUpsertWithoutCommentsInputSchema: z.ZodType<Prisma.AppUpsertWithoutCommentsInput> = z.object({
  update: z.union([ z.lazy(() => AppUpdateWithoutCommentsInputSchema),z.lazy(() => AppUncheckedUpdateWithoutCommentsInputSchema) ]),
  create: z.union([ z.lazy(() => AppCreateWithoutCommentsInputSchema),z.lazy(() => AppUncheckedCreateWithoutCommentsInputSchema) ]),
  where: z.lazy(() => AppWhereInputSchema).optional()
}).strict();

export const AppUpdateToOneWithWhereWithoutCommentsInputSchema: z.ZodType<Prisma.AppUpdateToOneWithWhereWithoutCommentsInput> = z.object({
  where: z.lazy(() => AppWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AppUpdateWithoutCommentsInputSchema),z.lazy(() => AppUncheckedUpdateWithoutCommentsInputSchema) ]),
}).strict();

export const AppUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.AppUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modelName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isOpenSource: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  creator: z.lazy(() => UserUpdateOneRequiredWithoutCreatedAppsNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUpdateManyWithoutAppsNestedInputSchema).optional(),
  category: z.lazy(() => AppCategoryUpdateOneRequiredWithoutAppNestedInputSchema).optional(),
  actions: z.lazy(() => AppActionUpdateManyWithoutAppNestedInputSchema).optional(),
  using: z.lazy(() => ConversationUpdateManyWithoutAppNestedInputSchema).optional(),
  starring: z.lazy(() => StarringAppUpdateManyWithoutAppNestedInputSchema).optional(),
  state: z.lazy(() => AppStateUpdateOneWithoutAppNestedInputSchema).optional()
}).strict();

export const AppUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.AppUncheckedUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  creatorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryMain: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  categorySub: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  modelName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isOpenSource: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  tags: z.lazy(() => AppTagUncheckedUpdateManyWithoutAppsNestedInputSchema).optional(),
  actions: z.lazy(() => AppActionUncheckedUpdateManyWithoutAppNestedInputSchema).optional(),
  using: z.lazy(() => ConversationUncheckedUpdateManyWithoutAppNestedInputSchema).optional(),
  starring: z.lazy(() => StarringAppUncheckedUpdateManyWithoutAppNestedInputSchema).optional(),
  state: z.lazy(() => AppStateUncheckedUpdateOneWithoutAppNestedInputSchema).optional()
}).strict();

export const AppCreateWithoutStateInputSchema: z.ZodType<Prisma.AppCreateWithoutStateInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  avatar: z.string(),
  desc: z.string(),
  language: z.string().optional(),
  version: z.string().optional(),
  modelName: z.string(),
  isOpenSource: z.boolean().optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  creator: z.lazy(() => UserCreateNestedOneWithoutCreatedAppsInputSchema),
  tags: z.lazy(() => AppTagCreateNestedManyWithoutAppsInputSchema).optional(),
  category: z.lazy(() => AppCategoryCreateNestedOneWithoutAppInputSchema),
  actions: z.lazy(() => AppActionCreateNestedManyWithoutAppInputSchema).optional(),
  using: z.lazy(() => ConversationCreateNestedManyWithoutAppInputSchema).optional(),
  starring: z.lazy(() => StarringAppCreateNestedManyWithoutAppInputSchema).optional(),
  comments: z.lazy(() => AppCommentCreateNestedManyWithoutAAppInputSchema).optional()
}).strict();

export const AppUncheckedCreateWithoutStateInputSchema: z.ZodType<Prisma.AppUncheckedCreateWithoutStateInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  creatorId: z.string(),
  name: z.string(),
  avatar: z.string(),
  desc: z.string(),
  language: z.string().optional(),
  version: z.string().optional(),
  categoryMain: z.number().int(),
  categorySub: z.number().int(),
  modelName: z.string(),
  isOpenSource: z.boolean().optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  tags: z.lazy(() => AppTagUncheckedCreateNestedManyWithoutAppsInputSchema).optional(),
  actions: z.lazy(() => AppActionUncheckedCreateNestedManyWithoutAppInputSchema).optional(),
  using: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutAppInputSchema).optional(),
  starring: z.lazy(() => StarringAppUncheckedCreateNestedManyWithoutAppInputSchema).optional(),
  comments: z.lazy(() => AppCommentUncheckedCreateNestedManyWithoutAAppInputSchema).optional()
}).strict();

export const AppCreateOrConnectWithoutStateInputSchema: z.ZodType<Prisma.AppCreateOrConnectWithoutStateInput> = z.object({
  where: z.lazy(() => AppWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AppCreateWithoutStateInputSchema),z.lazy(() => AppUncheckedCreateWithoutStateInputSchema) ]),
}).strict();

export const AppUpsertWithoutStateInputSchema: z.ZodType<Prisma.AppUpsertWithoutStateInput> = z.object({
  update: z.union([ z.lazy(() => AppUpdateWithoutStateInputSchema),z.lazy(() => AppUncheckedUpdateWithoutStateInputSchema) ]),
  create: z.union([ z.lazy(() => AppCreateWithoutStateInputSchema),z.lazy(() => AppUncheckedCreateWithoutStateInputSchema) ]),
  where: z.lazy(() => AppWhereInputSchema).optional()
}).strict();

export const AppUpdateToOneWithWhereWithoutStateInputSchema: z.ZodType<Prisma.AppUpdateToOneWithWhereWithoutStateInput> = z.object({
  where: z.lazy(() => AppWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AppUpdateWithoutStateInputSchema),z.lazy(() => AppUncheckedUpdateWithoutStateInputSchema) ]),
}).strict();

export const AppUpdateWithoutStateInputSchema: z.ZodType<Prisma.AppUpdateWithoutStateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modelName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isOpenSource: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  creator: z.lazy(() => UserUpdateOneRequiredWithoutCreatedAppsNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUpdateManyWithoutAppsNestedInputSchema).optional(),
  category: z.lazy(() => AppCategoryUpdateOneRequiredWithoutAppNestedInputSchema).optional(),
  actions: z.lazy(() => AppActionUpdateManyWithoutAppNestedInputSchema).optional(),
  using: z.lazy(() => ConversationUpdateManyWithoutAppNestedInputSchema).optional(),
  starring: z.lazy(() => StarringAppUpdateManyWithoutAppNestedInputSchema).optional(),
  comments: z.lazy(() => AppCommentUpdateManyWithoutAAppNestedInputSchema).optional()
}).strict();

export const AppUncheckedUpdateWithoutStateInputSchema: z.ZodType<Prisma.AppUncheckedUpdateWithoutStateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  creatorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryMain: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  categorySub: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  modelName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isOpenSource: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  tags: z.lazy(() => AppTagUncheckedUpdateManyWithoutAppsNestedInputSchema).optional(),
  actions: z.lazy(() => AppActionUncheckedUpdateManyWithoutAppNestedInputSchema).optional(),
  using: z.lazy(() => ConversationUncheckedUpdateManyWithoutAppNestedInputSchema).optional(),
  starring: z.lazy(() => StarringAppUncheckedUpdateManyWithoutAppNestedInputSchema).optional(),
  comments: z.lazy(() => AppCommentUncheckedUpdateManyWithoutAAppNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutTagsInputSchema: z.ZodType<Prisma.UserCreateWithoutTagsInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  followedByCount: z.number().int().optional(),
  followingCount: z.number().int().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationCreateNestedManyWithoutFromInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationCreateNestedManyWithoutToInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationCreateNestedManyWithoutFromInputSchema).optional(),
  following: z.lazy(() => FollowRelationCreateNestedManyWithoutToInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageCreateNestedManyWithoutUserInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionCreateNestedManyWithoutUserInputSchema).optional(),
  appComments: z.lazy(() => AppCommentCreateNestedManyWithoutUserInputSchema).optional(),
  appActions: z.lazy(() => AppActionCreateNestedManyWithoutUserInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppCreateNestedManyWithoutUserInputSchema).optional(),
  createdApps: z.lazy(() => AppCreateNestedManyWithoutCreatorInputSchema).optional(),
  conversations: z.lazy(() => ConversationCreateNestedManyWithoutUserInputSchema).optional(),
  Transcation: z.lazy(() => TranscationCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutTagsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTagsInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  followedByCount: z.number().int().optional(),
  followingCount: z.number().int().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUncheckedCreateNestedManyWithoutFromInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUncheckedCreateNestedManyWithoutToInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUncheckedCreateNestedManyWithoutFromInputSchema).optional(),
  following: z.lazy(() => FollowRelationUncheckedCreateNestedManyWithoutToInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  appActions: z.lazy(() => AppActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdApps: z.lazy(() => AppUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  conversations: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutTagsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTagsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutTagsInputSchema),z.lazy(() => UserUncheckedCreateWithoutTagsInputSchema) ]),
}).strict();

export const AppCreateWithoutTagsInputSchema: z.ZodType<Prisma.AppCreateWithoutTagsInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  avatar: z.string(),
  desc: z.string(),
  language: z.string().optional(),
  version: z.string().optional(),
  modelName: z.string(),
  isOpenSource: z.boolean().optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  creator: z.lazy(() => UserCreateNestedOneWithoutCreatedAppsInputSchema),
  category: z.lazy(() => AppCategoryCreateNestedOneWithoutAppInputSchema),
  actions: z.lazy(() => AppActionCreateNestedManyWithoutAppInputSchema).optional(),
  using: z.lazy(() => ConversationCreateNestedManyWithoutAppInputSchema).optional(),
  starring: z.lazy(() => StarringAppCreateNestedManyWithoutAppInputSchema).optional(),
  comments: z.lazy(() => AppCommentCreateNestedManyWithoutAAppInputSchema).optional(),
  state: z.lazy(() => AppStateCreateNestedOneWithoutAppInputSchema).optional()
}).strict();

export const AppUncheckedCreateWithoutTagsInputSchema: z.ZodType<Prisma.AppUncheckedCreateWithoutTagsInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  creatorId: z.string(),
  name: z.string(),
  avatar: z.string(),
  desc: z.string(),
  language: z.string().optional(),
  version: z.string().optional(),
  categoryMain: z.number().int(),
  categorySub: z.number().int(),
  modelName: z.string(),
  isOpenSource: z.boolean().optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  actions: z.lazy(() => AppActionUncheckedCreateNestedManyWithoutAppInputSchema).optional(),
  using: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutAppInputSchema).optional(),
  starring: z.lazy(() => StarringAppUncheckedCreateNestedManyWithoutAppInputSchema).optional(),
  comments: z.lazy(() => AppCommentUncheckedCreateNestedManyWithoutAAppInputSchema).optional(),
  state: z.lazy(() => AppStateUncheckedCreateNestedOneWithoutAppInputSchema).optional()
}).strict();

export const AppCreateOrConnectWithoutTagsInputSchema: z.ZodType<Prisma.AppCreateOrConnectWithoutTagsInput> = z.object({
  where: z.lazy(() => AppWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AppCreateWithoutTagsInputSchema),z.lazy(() => AppUncheckedCreateWithoutTagsInputSchema) ]),
}).strict();

export const UserUpsertWithoutTagsInputSchema: z.ZodType<Prisma.UserUpsertWithoutTagsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutTagsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTagsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutTagsInputSchema),z.lazy(() => UserUncheckedCreateWithoutTagsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutTagsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutTagsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutTagsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTagsInputSchema) ]),
}).strict();

export const UserUpdateWithoutTagsInputSchema: z.ZodType<Prisma.UserUpdateWithoutTagsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followedByCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUpdateManyWithoutFromNestedInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUpdateManyWithoutToNestedInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUpdateManyWithoutFromNestedInputSchema).optional(),
  following: z.lazy(() => FollowRelationUpdateManyWithoutToNestedInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUpdateManyWithoutUserNestedInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUpdateManyWithoutUserNestedInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUpdateManyWithoutUserNestedInputSchema).optional(),
  appActions: z.lazy(() => AppActionUpdateManyWithoutUserNestedInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUpdateManyWithoutUserNestedInputSchema).optional(),
  createdApps: z.lazy(() => AppUpdateManyWithoutCreatorNestedInputSchema).optional(),
  conversations: z.lazy(() => ConversationUpdateManyWithoutUserNestedInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutTagsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutTagsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followedByCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUncheckedUpdateManyWithoutFromNestedInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUncheckedUpdateManyWithoutToNestedInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUncheckedUpdateManyWithoutFromNestedInputSchema).optional(),
  following: z.lazy(() => FollowRelationUncheckedUpdateManyWithoutToNestedInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  appActions: z.lazy(() => AppActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdApps: z.lazy(() => AppUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  conversations: z.lazy(() => ConversationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const AppUpsertWithWhereUniqueWithoutTagsInputSchema: z.ZodType<Prisma.AppUpsertWithWhereUniqueWithoutTagsInput> = z.object({
  where: z.lazy(() => AppWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AppUpdateWithoutTagsInputSchema),z.lazy(() => AppUncheckedUpdateWithoutTagsInputSchema) ]),
  create: z.union([ z.lazy(() => AppCreateWithoutTagsInputSchema),z.lazy(() => AppUncheckedCreateWithoutTagsInputSchema) ]),
}).strict();

export const AppUpdateWithWhereUniqueWithoutTagsInputSchema: z.ZodType<Prisma.AppUpdateWithWhereUniqueWithoutTagsInput> = z.object({
  where: z.lazy(() => AppWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AppUpdateWithoutTagsInputSchema),z.lazy(() => AppUncheckedUpdateWithoutTagsInputSchema) ]),
}).strict();

export const AppUpdateManyWithWhereWithoutTagsInputSchema: z.ZodType<Prisma.AppUpdateManyWithWhereWithoutTagsInput> = z.object({
  where: z.lazy(() => AppScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AppUpdateManyMutationInputSchema),z.lazy(() => AppUncheckedUpdateManyWithoutTagsInputSchema) ]),
}).strict();

export const UserCreateWithoutChatMessagesInputSchema: z.ZodType<Prisma.UserCreateWithoutChatMessagesInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  followedByCount: z.number().int().optional(),
  followingCount: z.number().int().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationCreateNestedManyWithoutFromInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationCreateNestedManyWithoutToInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationCreateNestedManyWithoutFromInputSchema).optional(),
  following: z.lazy(() => FollowRelationCreateNestedManyWithoutToInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionCreateNestedManyWithoutUserInputSchema).optional(),
  tags: z.lazy(() => AppTagCreateNestedManyWithoutCreatorInputSchema).optional(),
  appComments: z.lazy(() => AppCommentCreateNestedManyWithoutUserInputSchema).optional(),
  appActions: z.lazy(() => AppActionCreateNestedManyWithoutUserInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppCreateNestedManyWithoutUserInputSchema).optional(),
  createdApps: z.lazy(() => AppCreateNestedManyWithoutCreatorInputSchema).optional(),
  conversations: z.lazy(() => ConversationCreateNestedManyWithoutUserInputSchema).optional(),
  Transcation: z.lazy(() => TranscationCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutChatMessagesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutChatMessagesInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  followedByCount: z.number().int().optional(),
  followingCount: z.number().int().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUncheckedCreateNestedManyWithoutFromInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUncheckedCreateNestedManyWithoutToInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUncheckedCreateNestedManyWithoutFromInputSchema).optional(),
  following: z.lazy(() => FollowRelationUncheckedCreateNestedManyWithoutToInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  tags: z.lazy(() => AppTagUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  appActions: z.lazy(() => AppActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdApps: z.lazy(() => AppUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  conversations: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutChatMessagesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutChatMessagesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutChatMessagesInputSchema),z.lazy(() => UserUncheckedCreateWithoutChatMessagesInputSchema) ]),
}).strict();

export const ChatMessageActionCreateWithoutMessageInputSchema: z.ZodType<Prisma.ChatMessageActionCreateWithoutMessageInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  action: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutChatMessageActionsInputSchema)
}).strict();

export const ChatMessageActionUncheckedCreateWithoutMessageInputSchema: z.ZodType<Prisma.ChatMessageActionUncheckedCreateWithoutMessageInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  action: z.string()
}).strict();

export const ChatMessageActionCreateOrConnectWithoutMessageInputSchema: z.ZodType<Prisma.ChatMessageActionCreateOrConnectWithoutMessageInput> = z.object({
  where: z.lazy(() => ChatMessageActionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ChatMessageActionCreateWithoutMessageInputSchema),z.lazy(() => ChatMessageActionUncheckedCreateWithoutMessageInputSchema) ]),
}).strict();

export const ChatMessageActionCreateManyMessageInputEnvelopeSchema: z.ZodType<Prisma.ChatMessageActionCreateManyMessageInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ChatMessageActionCreateManyMessageInputSchema),z.lazy(() => ChatMessageActionCreateManyMessageInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ConversationCreateWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationCreateWithoutMessagesInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isActive: z.boolean().optional(),
  pinned: z.boolean().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutConversationsInputSchema),
  app: z.lazy(() => AppCreateNestedOneWithoutUsingInputSchema)
}).strict();

export const ConversationUncheckedCreateWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationUncheckedCreateWithoutMessagesInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isActive: z.boolean().optional(),
  userId: z.string(),
  appId: z.string(),
  pinned: z.boolean().optional()
}).strict();

export const ConversationCreateOrConnectWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationCreateOrConnectWithoutMessagesInput> = z.object({
  where: z.lazy(() => ConversationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ConversationCreateWithoutMessagesInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutMessagesInputSchema) ]),
}).strict();

export const UserUpsertWithoutChatMessagesInputSchema: z.ZodType<Prisma.UserUpsertWithoutChatMessagesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutChatMessagesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutChatMessagesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutChatMessagesInputSchema),z.lazy(() => UserUncheckedCreateWithoutChatMessagesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutChatMessagesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutChatMessagesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutChatMessagesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutChatMessagesInputSchema) ]),
}).strict();

export const UserUpdateWithoutChatMessagesInputSchema: z.ZodType<Prisma.UserUpdateWithoutChatMessagesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followedByCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUpdateManyWithoutFromNestedInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUpdateManyWithoutToNestedInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUpdateManyWithoutFromNestedInputSchema).optional(),
  following: z.lazy(() => FollowRelationUpdateManyWithoutToNestedInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUpdateManyWithoutUserNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUpdateManyWithoutCreatorNestedInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUpdateManyWithoutUserNestedInputSchema).optional(),
  appActions: z.lazy(() => AppActionUpdateManyWithoutUserNestedInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUpdateManyWithoutUserNestedInputSchema).optional(),
  createdApps: z.lazy(() => AppUpdateManyWithoutCreatorNestedInputSchema).optional(),
  conversations: z.lazy(() => ConversationUpdateManyWithoutUserNestedInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutChatMessagesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutChatMessagesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followedByCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUncheckedUpdateManyWithoutFromNestedInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUncheckedUpdateManyWithoutToNestedInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUncheckedUpdateManyWithoutFromNestedInputSchema).optional(),
  following: z.lazy(() => FollowRelationUncheckedUpdateManyWithoutToNestedInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  appActions: z.lazy(() => AppActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdApps: z.lazy(() => AppUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  conversations: z.lazy(() => ConversationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const ChatMessageActionUpsertWithWhereUniqueWithoutMessageInputSchema: z.ZodType<Prisma.ChatMessageActionUpsertWithWhereUniqueWithoutMessageInput> = z.object({
  where: z.lazy(() => ChatMessageActionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ChatMessageActionUpdateWithoutMessageInputSchema),z.lazy(() => ChatMessageActionUncheckedUpdateWithoutMessageInputSchema) ]),
  create: z.union([ z.lazy(() => ChatMessageActionCreateWithoutMessageInputSchema),z.lazy(() => ChatMessageActionUncheckedCreateWithoutMessageInputSchema) ]),
}).strict();

export const ChatMessageActionUpdateWithWhereUniqueWithoutMessageInputSchema: z.ZodType<Prisma.ChatMessageActionUpdateWithWhereUniqueWithoutMessageInput> = z.object({
  where: z.lazy(() => ChatMessageActionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ChatMessageActionUpdateWithoutMessageInputSchema),z.lazy(() => ChatMessageActionUncheckedUpdateWithoutMessageInputSchema) ]),
}).strict();

export const ChatMessageActionUpdateManyWithWhereWithoutMessageInputSchema: z.ZodType<Prisma.ChatMessageActionUpdateManyWithWhereWithoutMessageInput> = z.object({
  where: z.lazy(() => ChatMessageActionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ChatMessageActionUpdateManyMutationInputSchema),z.lazy(() => ChatMessageActionUncheckedUpdateManyWithoutMessageInputSchema) ]),
}).strict();

export const ChatMessageActionScalarWhereInputSchema: z.ZodType<Prisma.ChatMessageActionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ChatMessageActionScalarWhereInputSchema),z.lazy(() => ChatMessageActionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChatMessageActionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChatMessageActionScalarWhereInputSchema),z.lazy(() => ChatMessageActionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  messageId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  action: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const ConversationUpsertWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationUpsertWithoutMessagesInput> = z.object({
  update: z.union([ z.lazy(() => ConversationUpdateWithoutMessagesInputSchema),z.lazy(() => ConversationUncheckedUpdateWithoutMessagesInputSchema) ]),
  create: z.union([ z.lazy(() => ConversationCreateWithoutMessagesInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutMessagesInputSchema) ]),
  where: z.lazy(() => ConversationWhereInputSchema).optional()
}).strict();

export const ConversationUpdateToOneWithWhereWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationUpdateToOneWithWhereWithoutMessagesInput> = z.object({
  where: z.lazy(() => ConversationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ConversationUpdateWithoutMessagesInputSchema),z.lazy(() => ConversationUncheckedUpdateWithoutMessagesInputSchema) ]),
}).strict();

export const ConversationUpdateWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationUpdateWithoutMessagesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  pinned: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutConversationsNestedInputSchema).optional(),
  app: z.lazy(() => AppUpdateOneRequiredWithoutUsingNestedInputSchema).optional()
}).strict();

export const ConversationUncheckedUpdateWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateWithoutMessagesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  appId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pinned: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateWithoutChatMessageActionsInputSchema: z.ZodType<Prisma.UserCreateWithoutChatMessageActionsInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  followedByCount: z.number().int().optional(),
  followingCount: z.number().int().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationCreateNestedManyWithoutFromInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationCreateNestedManyWithoutToInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationCreateNestedManyWithoutFromInputSchema).optional(),
  following: z.lazy(() => FollowRelationCreateNestedManyWithoutToInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageCreateNestedManyWithoutUserInputSchema).optional(),
  tags: z.lazy(() => AppTagCreateNestedManyWithoutCreatorInputSchema).optional(),
  appComments: z.lazy(() => AppCommentCreateNestedManyWithoutUserInputSchema).optional(),
  appActions: z.lazy(() => AppActionCreateNestedManyWithoutUserInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppCreateNestedManyWithoutUserInputSchema).optional(),
  createdApps: z.lazy(() => AppCreateNestedManyWithoutCreatorInputSchema).optional(),
  conversations: z.lazy(() => ConversationCreateNestedManyWithoutUserInputSchema).optional(),
  Transcation: z.lazy(() => TranscationCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutChatMessageActionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutChatMessageActionsInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  followedByCount: z.number().int().optional(),
  followingCount: z.number().int().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUncheckedCreateNestedManyWithoutFromInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUncheckedCreateNestedManyWithoutToInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUncheckedCreateNestedManyWithoutFromInputSchema).optional(),
  following: z.lazy(() => FollowRelationUncheckedCreateNestedManyWithoutToInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  tags: z.lazy(() => AppTagUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  appActions: z.lazy(() => AppActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdApps: z.lazy(() => AppUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  conversations: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutChatMessageActionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutChatMessageActionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutChatMessageActionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutChatMessageActionsInputSchema) ]),
}).strict();

export const ChatMessageCreateWithoutUserActionOnMessageInputSchema: z.ZodType<Prisma.ChatMessageCreateWithoutUserActionOnMessageInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => PromptRoleTypeSchema).optional(),
  content: z.string(),
  format: z.lazy(() => ChatMessageFormatTypeSchema).optional(),
  shortId: z.string().optional(),
  namespace: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutChatMessagesInputSchema).optional(),
  conversation: z.lazy(() => ConversationCreateNestedOneWithoutMessagesInputSchema)
}).strict();

export const ChatMessageUncheckedCreateWithoutUserActionOnMessageInputSchema: z.ZodType<Prisma.ChatMessageUncheckedCreateWithoutUserActionOnMessageInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string().optional().nullable(),
  role: z.lazy(() => PromptRoleTypeSchema).optional(),
  content: z.string(),
  format: z.lazy(() => ChatMessageFormatTypeSchema).optional(),
  conversationId: z.string(),
  shortId: z.string().optional(),
  namespace: z.string().optional().nullable()
}).strict();

export const ChatMessageCreateOrConnectWithoutUserActionOnMessageInputSchema: z.ZodType<Prisma.ChatMessageCreateOrConnectWithoutUserActionOnMessageInput> = z.object({
  where: z.lazy(() => ChatMessageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ChatMessageCreateWithoutUserActionOnMessageInputSchema),z.lazy(() => ChatMessageUncheckedCreateWithoutUserActionOnMessageInputSchema) ]),
}).strict();

export const UserUpsertWithoutChatMessageActionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutChatMessageActionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutChatMessageActionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutChatMessageActionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutChatMessageActionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutChatMessageActionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutChatMessageActionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutChatMessageActionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutChatMessageActionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutChatMessageActionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutChatMessageActionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutChatMessageActionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followedByCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUpdateManyWithoutFromNestedInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUpdateManyWithoutToNestedInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUpdateManyWithoutFromNestedInputSchema).optional(),
  following: z.lazy(() => FollowRelationUpdateManyWithoutToNestedInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUpdateManyWithoutUserNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUpdateManyWithoutCreatorNestedInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUpdateManyWithoutUserNestedInputSchema).optional(),
  appActions: z.lazy(() => AppActionUpdateManyWithoutUserNestedInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUpdateManyWithoutUserNestedInputSchema).optional(),
  createdApps: z.lazy(() => AppUpdateManyWithoutCreatorNestedInputSchema).optional(),
  conversations: z.lazy(() => ConversationUpdateManyWithoutUserNestedInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutChatMessageActionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutChatMessageActionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followedByCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUncheckedUpdateManyWithoutFromNestedInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUncheckedUpdateManyWithoutToNestedInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUncheckedUpdateManyWithoutFromNestedInputSchema).optional(),
  following: z.lazy(() => FollowRelationUncheckedUpdateManyWithoutToNestedInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  appActions: z.lazy(() => AppActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdApps: z.lazy(() => AppUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  conversations: z.lazy(() => ConversationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const ChatMessageUpsertWithoutUserActionOnMessageInputSchema: z.ZodType<Prisma.ChatMessageUpsertWithoutUserActionOnMessageInput> = z.object({
  update: z.union([ z.lazy(() => ChatMessageUpdateWithoutUserActionOnMessageInputSchema),z.lazy(() => ChatMessageUncheckedUpdateWithoutUserActionOnMessageInputSchema) ]),
  create: z.union([ z.lazy(() => ChatMessageCreateWithoutUserActionOnMessageInputSchema),z.lazy(() => ChatMessageUncheckedCreateWithoutUserActionOnMessageInputSchema) ]),
  where: z.lazy(() => ChatMessageWhereInputSchema).optional()
}).strict();

export const ChatMessageUpdateToOneWithWhereWithoutUserActionOnMessageInputSchema: z.ZodType<Prisma.ChatMessageUpdateToOneWithWhereWithoutUserActionOnMessageInput> = z.object({
  where: z.lazy(() => ChatMessageWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ChatMessageUpdateWithoutUserActionOnMessageInputSchema),z.lazy(() => ChatMessageUncheckedUpdateWithoutUserActionOnMessageInputSchema) ]),
}).strict();

export const ChatMessageUpdateWithoutUserActionOnMessageInputSchema: z.ZodType<Prisma.ChatMessageUpdateWithoutUserActionOnMessageInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => PromptRoleTypeSchema),z.lazy(() => EnumPromptRoleTypeFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  format: z.union([ z.lazy(() => ChatMessageFormatTypeSchema),z.lazy(() => EnumChatMessageFormatTypeFieldUpdateOperationsInputSchema) ]).optional(),
  shortId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  namespace: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneWithoutChatMessagesNestedInputSchema).optional(),
  conversation: z.lazy(() => ConversationUpdateOneRequiredWithoutMessagesNestedInputSchema).optional()
}).strict();

export const ChatMessageUncheckedUpdateWithoutUserActionOnMessageInputSchema: z.ZodType<Prisma.ChatMessageUncheckedUpdateWithoutUserActionOnMessageInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => PromptRoleTypeSchema),z.lazy(() => EnumPromptRoleTypeFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  format: z.union([ z.lazy(() => ChatMessageFormatTypeSchema),z.lazy(() => EnumChatMessageFormatTypeFieldUpdateOperationsInputSchema) ]).optional(),
  conversationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  shortId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  namespace: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ChatMessageCreateWithoutConversationInputSchema: z.ZodType<Prisma.ChatMessageCreateWithoutConversationInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => PromptRoleTypeSchema).optional(),
  content: z.string(),
  format: z.lazy(() => ChatMessageFormatTypeSchema).optional(),
  shortId: z.string().optional(),
  namespace: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutChatMessagesInputSchema).optional(),
  userActionOnMessage: z.lazy(() => ChatMessageActionCreateNestedManyWithoutMessageInputSchema).optional()
}).strict();

export const ChatMessageUncheckedCreateWithoutConversationInputSchema: z.ZodType<Prisma.ChatMessageUncheckedCreateWithoutConversationInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string().optional().nullable(),
  role: z.lazy(() => PromptRoleTypeSchema).optional(),
  content: z.string(),
  format: z.lazy(() => ChatMessageFormatTypeSchema).optional(),
  shortId: z.string().optional(),
  namespace: z.string().optional().nullable(),
  userActionOnMessage: z.lazy(() => ChatMessageActionUncheckedCreateNestedManyWithoutMessageInputSchema).optional()
}).strict();

export const ChatMessageCreateOrConnectWithoutConversationInputSchema: z.ZodType<Prisma.ChatMessageCreateOrConnectWithoutConversationInput> = z.object({
  where: z.lazy(() => ChatMessageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ChatMessageCreateWithoutConversationInputSchema),z.lazy(() => ChatMessageUncheckedCreateWithoutConversationInputSchema) ]),
}).strict();

export const ChatMessageCreateManyConversationInputEnvelopeSchema: z.ZodType<Prisma.ChatMessageCreateManyConversationInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ChatMessageCreateManyConversationInputSchema),z.lazy(() => ChatMessageCreateManyConversationInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserCreateWithoutConversationsInputSchema: z.ZodType<Prisma.UserCreateWithoutConversationsInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  followedByCount: z.number().int().optional(),
  followingCount: z.number().int().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationCreateNestedManyWithoutFromInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationCreateNestedManyWithoutToInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationCreateNestedManyWithoutFromInputSchema).optional(),
  following: z.lazy(() => FollowRelationCreateNestedManyWithoutToInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageCreateNestedManyWithoutUserInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionCreateNestedManyWithoutUserInputSchema).optional(),
  tags: z.lazy(() => AppTagCreateNestedManyWithoutCreatorInputSchema).optional(),
  appComments: z.lazy(() => AppCommentCreateNestedManyWithoutUserInputSchema).optional(),
  appActions: z.lazy(() => AppActionCreateNestedManyWithoutUserInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppCreateNestedManyWithoutUserInputSchema).optional(),
  createdApps: z.lazy(() => AppCreateNestedManyWithoutCreatorInputSchema).optional(),
  Transcation: z.lazy(() => TranscationCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutConversationsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutConversationsInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  followedByCount: z.number().int().optional(),
  followingCount: z.number().int().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUncheckedCreateNestedManyWithoutFromInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUncheckedCreateNestedManyWithoutToInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUncheckedCreateNestedManyWithoutFromInputSchema).optional(),
  following: z.lazy(() => FollowRelationUncheckedCreateNestedManyWithoutToInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  tags: z.lazy(() => AppTagUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  appActions: z.lazy(() => AppActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdApps: z.lazy(() => AppUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutConversationsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutConversationsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutConversationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutConversationsInputSchema) ]),
}).strict();

export const AppCreateWithoutUsingInputSchema: z.ZodType<Prisma.AppCreateWithoutUsingInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  avatar: z.string(),
  desc: z.string(),
  language: z.string().optional(),
  version: z.string().optional(),
  modelName: z.string(),
  isOpenSource: z.boolean().optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  creator: z.lazy(() => UserCreateNestedOneWithoutCreatedAppsInputSchema),
  tags: z.lazy(() => AppTagCreateNestedManyWithoutAppsInputSchema).optional(),
  category: z.lazy(() => AppCategoryCreateNestedOneWithoutAppInputSchema),
  actions: z.lazy(() => AppActionCreateNestedManyWithoutAppInputSchema).optional(),
  starring: z.lazy(() => StarringAppCreateNestedManyWithoutAppInputSchema).optional(),
  comments: z.lazy(() => AppCommentCreateNestedManyWithoutAAppInputSchema).optional(),
  state: z.lazy(() => AppStateCreateNestedOneWithoutAppInputSchema).optional()
}).strict();

export const AppUncheckedCreateWithoutUsingInputSchema: z.ZodType<Prisma.AppUncheckedCreateWithoutUsingInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  creatorId: z.string(),
  name: z.string(),
  avatar: z.string(),
  desc: z.string(),
  language: z.string().optional(),
  version: z.string().optional(),
  categoryMain: z.number().int(),
  categorySub: z.number().int(),
  modelName: z.string(),
  isOpenSource: z.boolean().optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  tags: z.lazy(() => AppTagUncheckedCreateNestedManyWithoutAppsInputSchema).optional(),
  actions: z.lazy(() => AppActionUncheckedCreateNestedManyWithoutAppInputSchema).optional(),
  starring: z.lazy(() => StarringAppUncheckedCreateNestedManyWithoutAppInputSchema).optional(),
  comments: z.lazy(() => AppCommentUncheckedCreateNestedManyWithoutAAppInputSchema).optional(),
  state: z.lazy(() => AppStateUncheckedCreateNestedOneWithoutAppInputSchema).optional()
}).strict();

export const AppCreateOrConnectWithoutUsingInputSchema: z.ZodType<Prisma.AppCreateOrConnectWithoutUsingInput> = z.object({
  where: z.lazy(() => AppWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AppCreateWithoutUsingInputSchema),z.lazy(() => AppUncheckedCreateWithoutUsingInputSchema) ]),
}).strict();

export const ChatMessageUpsertWithWhereUniqueWithoutConversationInputSchema: z.ZodType<Prisma.ChatMessageUpsertWithWhereUniqueWithoutConversationInput> = z.object({
  where: z.lazy(() => ChatMessageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ChatMessageUpdateWithoutConversationInputSchema),z.lazy(() => ChatMessageUncheckedUpdateWithoutConversationInputSchema) ]),
  create: z.union([ z.lazy(() => ChatMessageCreateWithoutConversationInputSchema),z.lazy(() => ChatMessageUncheckedCreateWithoutConversationInputSchema) ]),
}).strict();

export const ChatMessageUpdateWithWhereUniqueWithoutConversationInputSchema: z.ZodType<Prisma.ChatMessageUpdateWithWhereUniqueWithoutConversationInput> = z.object({
  where: z.lazy(() => ChatMessageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ChatMessageUpdateWithoutConversationInputSchema),z.lazy(() => ChatMessageUncheckedUpdateWithoutConversationInputSchema) ]),
}).strict();

export const ChatMessageUpdateManyWithWhereWithoutConversationInputSchema: z.ZodType<Prisma.ChatMessageUpdateManyWithWhereWithoutConversationInput> = z.object({
  where: z.lazy(() => ChatMessageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ChatMessageUpdateManyMutationInputSchema),z.lazy(() => ChatMessageUncheckedUpdateManyWithoutConversationInputSchema) ]),
}).strict();

export const ChatMessageScalarWhereInputSchema: z.ZodType<Prisma.ChatMessageScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ChatMessageScalarWhereInputSchema),z.lazy(() => ChatMessageScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChatMessageScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChatMessageScalarWhereInputSchema),z.lazy(() => ChatMessageScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => EnumPromptRoleTypeFilterSchema),z.lazy(() => PromptRoleTypeSchema) ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  format: z.union([ z.lazy(() => EnumChatMessageFormatTypeFilterSchema),z.lazy(() => ChatMessageFormatTypeSchema) ]).optional(),
  conversationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  shortId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  namespace: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const UserUpsertWithoutConversationsInputSchema: z.ZodType<Prisma.UserUpsertWithoutConversationsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutConversationsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutConversationsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutConversationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutConversationsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutConversationsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutConversationsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutConversationsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutConversationsInputSchema) ]),
}).strict();

export const UserUpdateWithoutConversationsInputSchema: z.ZodType<Prisma.UserUpdateWithoutConversationsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followedByCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUpdateManyWithoutFromNestedInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUpdateManyWithoutToNestedInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUpdateManyWithoutFromNestedInputSchema).optional(),
  following: z.lazy(() => FollowRelationUpdateManyWithoutToNestedInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUpdateManyWithoutUserNestedInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUpdateManyWithoutUserNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUpdateManyWithoutCreatorNestedInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUpdateManyWithoutUserNestedInputSchema).optional(),
  appActions: z.lazy(() => AppActionUpdateManyWithoutUserNestedInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUpdateManyWithoutUserNestedInputSchema).optional(),
  createdApps: z.lazy(() => AppUpdateManyWithoutCreatorNestedInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutConversationsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutConversationsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followedByCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUncheckedUpdateManyWithoutFromNestedInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUncheckedUpdateManyWithoutToNestedInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUncheckedUpdateManyWithoutFromNestedInputSchema).optional(),
  following: z.lazy(() => FollowRelationUncheckedUpdateManyWithoutToNestedInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  appActions: z.lazy(() => AppActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdApps: z.lazy(() => AppUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const AppUpsertWithoutUsingInputSchema: z.ZodType<Prisma.AppUpsertWithoutUsingInput> = z.object({
  update: z.union([ z.lazy(() => AppUpdateWithoutUsingInputSchema),z.lazy(() => AppUncheckedUpdateWithoutUsingInputSchema) ]),
  create: z.union([ z.lazy(() => AppCreateWithoutUsingInputSchema),z.lazy(() => AppUncheckedCreateWithoutUsingInputSchema) ]),
  where: z.lazy(() => AppWhereInputSchema).optional()
}).strict();

export const AppUpdateToOneWithWhereWithoutUsingInputSchema: z.ZodType<Prisma.AppUpdateToOneWithWhereWithoutUsingInput> = z.object({
  where: z.lazy(() => AppWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AppUpdateWithoutUsingInputSchema),z.lazy(() => AppUncheckedUpdateWithoutUsingInputSchema) ]),
}).strict();

export const AppUpdateWithoutUsingInputSchema: z.ZodType<Prisma.AppUpdateWithoutUsingInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modelName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isOpenSource: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  creator: z.lazy(() => UserUpdateOneRequiredWithoutCreatedAppsNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUpdateManyWithoutAppsNestedInputSchema).optional(),
  category: z.lazy(() => AppCategoryUpdateOneRequiredWithoutAppNestedInputSchema).optional(),
  actions: z.lazy(() => AppActionUpdateManyWithoutAppNestedInputSchema).optional(),
  starring: z.lazy(() => StarringAppUpdateManyWithoutAppNestedInputSchema).optional(),
  comments: z.lazy(() => AppCommentUpdateManyWithoutAAppNestedInputSchema).optional(),
  state: z.lazy(() => AppStateUpdateOneWithoutAppNestedInputSchema).optional()
}).strict();

export const AppUncheckedUpdateWithoutUsingInputSchema: z.ZodType<Prisma.AppUncheckedUpdateWithoutUsingInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  creatorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryMain: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  categorySub: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  modelName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isOpenSource: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  tags: z.lazy(() => AppTagUncheckedUpdateManyWithoutAppsNestedInputSchema).optional(),
  actions: z.lazy(() => AppActionUncheckedUpdateManyWithoutAppNestedInputSchema).optional(),
  starring: z.lazy(() => StarringAppUncheckedUpdateManyWithoutAppNestedInputSchema).optional(),
  comments: z.lazy(() => AppCommentUncheckedUpdateManyWithoutAAppNestedInputSchema).optional(),
  state: z.lazy(() => AppStateUncheckedUpdateOneWithoutAppNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutFollowedByInputSchema: z.ZodType<Prisma.UserCreateWithoutFollowedByInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  followedByCount: z.number().int().optional(),
  followingCount: z.number().int().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationCreateNestedManyWithoutFromInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationCreateNestedManyWithoutToInputSchema).optional(),
  following: z.lazy(() => FollowRelationCreateNestedManyWithoutToInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageCreateNestedManyWithoutUserInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionCreateNestedManyWithoutUserInputSchema).optional(),
  tags: z.lazy(() => AppTagCreateNestedManyWithoutCreatorInputSchema).optional(),
  appComments: z.lazy(() => AppCommentCreateNestedManyWithoutUserInputSchema).optional(),
  appActions: z.lazy(() => AppActionCreateNestedManyWithoutUserInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppCreateNestedManyWithoutUserInputSchema).optional(),
  createdApps: z.lazy(() => AppCreateNestedManyWithoutCreatorInputSchema).optional(),
  conversations: z.lazy(() => ConversationCreateNestedManyWithoutUserInputSchema).optional(),
  Transcation: z.lazy(() => TranscationCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutFollowedByInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutFollowedByInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  followedByCount: z.number().int().optional(),
  followingCount: z.number().int().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUncheckedCreateNestedManyWithoutFromInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUncheckedCreateNestedManyWithoutToInputSchema).optional(),
  following: z.lazy(() => FollowRelationUncheckedCreateNestedManyWithoutToInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  tags: z.lazy(() => AppTagUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  appActions: z.lazy(() => AppActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdApps: z.lazy(() => AppUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  conversations: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutFollowedByInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutFollowedByInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutFollowedByInputSchema),z.lazy(() => UserUncheckedCreateWithoutFollowedByInputSchema) ]),
}).strict();

export const UserCreateWithoutFollowingInputSchema: z.ZodType<Prisma.UserCreateWithoutFollowingInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  followedByCount: z.number().int().optional(),
  followingCount: z.number().int().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationCreateNestedManyWithoutFromInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationCreateNestedManyWithoutToInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationCreateNestedManyWithoutFromInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageCreateNestedManyWithoutUserInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionCreateNestedManyWithoutUserInputSchema).optional(),
  tags: z.lazy(() => AppTagCreateNestedManyWithoutCreatorInputSchema).optional(),
  appComments: z.lazy(() => AppCommentCreateNestedManyWithoutUserInputSchema).optional(),
  appActions: z.lazy(() => AppActionCreateNestedManyWithoutUserInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppCreateNestedManyWithoutUserInputSchema).optional(),
  createdApps: z.lazy(() => AppCreateNestedManyWithoutCreatorInputSchema).optional(),
  conversations: z.lazy(() => ConversationCreateNestedManyWithoutUserInputSchema).optional(),
  Transcation: z.lazy(() => TranscationCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutFollowingInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutFollowingInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  followedByCount: z.number().int().optional(),
  followingCount: z.number().int().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUncheckedCreateNestedManyWithoutFromInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUncheckedCreateNestedManyWithoutToInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUncheckedCreateNestedManyWithoutFromInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  tags: z.lazy(() => AppTagUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  appActions: z.lazy(() => AppActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdApps: z.lazy(() => AppUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  conversations: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutFollowingInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutFollowingInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutFollowingInputSchema),z.lazy(() => UserUncheckedCreateWithoutFollowingInputSchema) ]),
}).strict();

export const UserUpsertWithoutFollowedByInputSchema: z.ZodType<Prisma.UserUpsertWithoutFollowedByInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutFollowedByInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFollowedByInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutFollowedByInputSchema),z.lazy(() => UserUncheckedCreateWithoutFollowedByInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutFollowedByInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutFollowedByInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutFollowedByInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFollowedByInputSchema) ]),
}).strict();

export const UserUpdateWithoutFollowedByInputSchema: z.ZodType<Prisma.UserUpdateWithoutFollowedByInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followedByCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUpdateManyWithoutFromNestedInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUpdateManyWithoutToNestedInputSchema).optional(),
  following: z.lazy(() => FollowRelationUpdateManyWithoutToNestedInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUpdateManyWithoutUserNestedInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUpdateManyWithoutUserNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUpdateManyWithoutCreatorNestedInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUpdateManyWithoutUserNestedInputSchema).optional(),
  appActions: z.lazy(() => AppActionUpdateManyWithoutUserNestedInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUpdateManyWithoutUserNestedInputSchema).optional(),
  createdApps: z.lazy(() => AppUpdateManyWithoutCreatorNestedInputSchema).optional(),
  conversations: z.lazy(() => ConversationUpdateManyWithoutUserNestedInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutFollowedByInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutFollowedByInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followedByCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUncheckedUpdateManyWithoutFromNestedInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUncheckedUpdateManyWithoutToNestedInputSchema).optional(),
  following: z.lazy(() => FollowRelationUncheckedUpdateManyWithoutToNestedInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  appActions: z.lazy(() => AppActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdApps: z.lazy(() => AppUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  conversations: z.lazy(() => ConversationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutFollowingInputSchema: z.ZodType<Prisma.UserUpsertWithoutFollowingInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutFollowingInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFollowingInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutFollowingInputSchema),z.lazy(() => UserUncheckedCreateWithoutFollowingInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutFollowingInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutFollowingInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutFollowingInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFollowingInputSchema) ]),
}).strict();

export const UserUpdateWithoutFollowingInputSchema: z.ZodType<Prisma.UserUpdateWithoutFollowingInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followedByCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUpdateManyWithoutFromNestedInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUpdateManyWithoutToNestedInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUpdateManyWithoutFromNestedInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUpdateManyWithoutUserNestedInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUpdateManyWithoutUserNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUpdateManyWithoutCreatorNestedInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUpdateManyWithoutUserNestedInputSchema).optional(),
  appActions: z.lazy(() => AppActionUpdateManyWithoutUserNestedInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUpdateManyWithoutUserNestedInputSchema).optional(),
  createdApps: z.lazy(() => AppUpdateManyWithoutCreatorNestedInputSchema).optional(),
  conversations: z.lazy(() => ConversationUpdateManyWithoutUserNestedInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutFollowingInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutFollowingInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followedByCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUncheckedUpdateManyWithoutFromNestedInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUncheckedUpdateManyWithoutToNestedInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUncheckedUpdateManyWithoutFromNestedInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  appActions: z.lazy(() => AppActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdApps: z.lazy(() => AppUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  conversations: z.lazy(() => ConversationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutInvitedFromInputSchema: z.ZodType<Prisma.UserCreateWithoutInvitedFromInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  followedByCount: z.number().int().optional(),
  followingCount: z.number().int().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationCreateNestedManyWithoutToInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationCreateNestedManyWithoutFromInputSchema).optional(),
  following: z.lazy(() => FollowRelationCreateNestedManyWithoutToInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageCreateNestedManyWithoutUserInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionCreateNestedManyWithoutUserInputSchema).optional(),
  tags: z.lazy(() => AppTagCreateNestedManyWithoutCreatorInputSchema).optional(),
  appComments: z.lazy(() => AppCommentCreateNestedManyWithoutUserInputSchema).optional(),
  appActions: z.lazy(() => AppActionCreateNestedManyWithoutUserInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppCreateNestedManyWithoutUserInputSchema).optional(),
  createdApps: z.lazy(() => AppCreateNestedManyWithoutCreatorInputSchema).optional(),
  conversations: z.lazy(() => ConversationCreateNestedManyWithoutUserInputSchema).optional(),
  Transcation: z.lazy(() => TranscationCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutInvitedFromInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutInvitedFromInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  followedByCount: z.number().int().optional(),
  followingCount: z.number().int().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUncheckedCreateNestedManyWithoutToInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUncheckedCreateNestedManyWithoutFromInputSchema).optional(),
  following: z.lazy(() => FollowRelationUncheckedCreateNestedManyWithoutToInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  tags: z.lazy(() => AppTagUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  appActions: z.lazy(() => AppActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdApps: z.lazy(() => AppUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  conversations: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutInvitedFromInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutInvitedFromInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutInvitedFromInputSchema),z.lazy(() => UserUncheckedCreateWithoutInvitedFromInputSchema) ]),
}).strict();

export const UserCreateWithoutInvitedToInputSchema: z.ZodType<Prisma.UserCreateWithoutInvitedToInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  followedByCount: z.number().int().optional(),
  followingCount: z.number().int().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationCreateNestedManyWithoutFromInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationCreateNestedManyWithoutFromInputSchema).optional(),
  following: z.lazy(() => FollowRelationCreateNestedManyWithoutToInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageCreateNestedManyWithoutUserInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionCreateNestedManyWithoutUserInputSchema).optional(),
  tags: z.lazy(() => AppTagCreateNestedManyWithoutCreatorInputSchema).optional(),
  appComments: z.lazy(() => AppCommentCreateNestedManyWithoutUserInputSchema).optional(),
  appActions: z.lazy(() => AppActionCreateNestedManyWithoutUserInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppCreateNestedManyWithoutUserInputSchema).optional(),
  createdApps: z.lazy(() => AppCreateNestedManyWithoutCreatorInputSchema).optional(),
  conversations: z.lazy(() => ConversationCreateNestedManyWithoutUserInputSchema).optional(),
  Transcation: z.lazy(() => TranscationCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutInvitedToInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutInvitedToInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  followedByCount: z.number().int().optional(),
  followingCount: z.number().int().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUncheckedCreateNestedManyWithoutFromInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUncheckedCreateNestedManyWithoutFromInputSchema).optional(),
  following: z.lazy(() => FollowRelationUncheckedCreateNestedManyWithoutToInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  tags: z.lazy(() => AppTagUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  appActions: z.lazy(() => AppActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdApps: z.lazy(() => AppUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  conversations: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutInvitedToInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutInvitedToInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutInvitedToInputSchema),z.lazy(() => UserUncheckedCreateWithoutInvitedToInputSchema) ]),
}).strict();

export const UserUpsertWithoutInvitedFromInputSchema: z.ZodType<Prisma.UserUpsertWithoutInvitedFromInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutInvitedFromInputSchema),z.lazy(() => UserUncheckedUpdateWithoutInvitedFromInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutInvitedFromInputSchema),z.lazy(() => UserUncheckedCreateWithoutInvitedFromInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutInvitedFromInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutInvitedFromInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutInvitedFromInputSchema),z.lazy(() => UserUncheckedUpdateWithoutInvitedFromInputSchema) ]),
}).strict();

export const UserUpdateWithoutInvitedFromInputSchema: z.ZodType<Prisma.UserUpdateWithoutInvitedFromInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followedByCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUpdateManyWithoutToNestedInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUpdateManyWithoutFromNestedInputSchema).optional(),
  following: z.lazy(() => FollowRelationUpdateManyWithoutToNestedInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUpdateManyWithoutUserNestedInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUpdateManyWithoutUserNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUpdateManyWithoutCreatorNestedInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUpdateManyWithoutUserNestedInputSchema).optional(),
  appActions: z.lazy(() => AppActionUpdateManyWithoutUserNestedInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUpdateManyWithoutUserNestedInputSchema).optional(),
  createdApps: z.lazy(() => AppUpdateManyWithoutCreatorNestedInputSchema).optional(),
  conversations: z.lazy(() => ConversationUpdateManyWithoutUserNestedInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutInvitedFromInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutInvitedFromInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followedByCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUncheckedUpdateManyWithoutToNestedInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUncheckedUpdateManyWithoutFromNestedInputSchema).optional(),
  following: z.lazy(() => FollowRelationUncheckedUpdateManyWithoutToNestedInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  appActions: z.lazy(() => AppActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdApps: z.lazy(() => AppUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  conversations: z.lazy(() => ConversationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutInvitedToInputSchema: z.ZodType<Prisma.UserUpsertWithoutInvitedToInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutInvitedToInputSchema),z.lazy(() => UserUncheckedUpdateWithoutInvitedToInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutInvitedToInputSchema),z.lazy(() => UserUncheckedCreateWithoutInvitedToInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutInvitedToInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutInvitedToInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutInvitedToInputSchema),z.lazy(() => UserUncheckedUpdateWithoutInvitedToInputSchema) ]),
}).strict();

export const UserUpdateWithoutInvitedToInputSchema: z.ZodType<Prisma.UserUpdateWithoutInvitedToInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followedByCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUpdateManyWithoutFromNestedInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUpdateManyWithoutFromNestedInputSchema).optional(),
  following: z.lazy(() => FollowRelationUpdateManyWithoutToNestedInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUpdateManyWithoutUserNestedInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUpdateManyWithoutUserNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUpdateManyWithoutCreatorNestedInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUpdateManyWithoutUserNestedInputSchema).optional(),
  appActions: z.lazy(() => AppActionUpdateManyWithoutUserNestedInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUpdateManyWithoutUserNestedInputSchema).optional(),
  createdApps: z.lazy(() => AppUpdateManyWithoutCreatorNestedInputSchema).optional(),
  conversations: z.lazy(() => ConversationUpdateManyWithoutUserNestedInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutInvitedToInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutInvitedToInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followedByCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUncheckedUpdateManyWithoutFromNestedInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUncheckedUpdateManyWithoutFromNestedInputSchema).optional(),
  following: z.lazy(() => FollowRelationUncheckedUpdateManyWithoutToNestedInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  appActions: z.lazy(() => AppActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdApps: z.lazy(() => AppUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  conversations: z.lazy(() => ConversationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  followedByCount: z.number().int().optional(),
  followingCount: z.number().int().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationCreateNestedManyWithoutFromInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationCreateNestedManyWithoutToInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationCreateNestedManyWithoutFromInputSchema).optional(),
  following: z.lazy(() => FollowRelationCreateNestedManyWithoutToInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageCreateNestedManyWithoutUserInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionCreateNestedManyWithoutUserInputSchema).optional(),
  tags: z.lazy(() => AppTagCreateNestedManyWithoutCreatorInputSchema).optional(),
  appComments: z.lazy(() => AppCommentCreateNestedManyWithoutUserInputSchema).optional(),
  appActions: z.lazy(() => AppActionCreateNestedManyWithoutUserInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppCreateNestedManyWithoutUserInputSchema).optional(),
  createdApps: z.lazy(() => AppCreateNestedManyWithoutCreatorInputSchema).optional(),
  conversations: z.lazy(() => ConversationCreateNestedManyWithoutUserInputSchema).optional(),
  Transcation: z.lazy(() => TranscationCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  followedByCount: z.number().int().optional(),
  followingCount: z.number().int().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUncheckedCreateNestedManyWithoutFromInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUncheckedCreateNestedManyWithoutToInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUncheckedCreateNestedManyWithoutFromInputSchema).optional(),
  following: z.lazy(() => FollowRelationUncheckedCreateNestedManyWithoutToInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  tags: z.lazy(() => AppTagUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  appActions: z.lazy(() => AppActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdApps: z.lazy(() => AppUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  conversations: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followedByCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUpdateManyWithoutFromNestedInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUpdateManyWithoutToNestedInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUpdateManyWithoutFromNestedInputSchema).optional(),
  following: z.lazy(() => FollowRelationUpdateManyWithoutToNestedInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUpdateManyWithoutUserNestedInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUpdateManyWithoutUserNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUpdateManyWithoutCreatorNestedInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUpdateManyWithoutUserNestedInputSchema).optional(),
  appActions: z.lazy(() => AppActionUpdateManyWithoutUserNestedInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUpdateManyWithoutUserNestedInputSchema).optional(),
  createdApps: z.lazy(() => AppUpdateManyWithoutCreatorNestedInputSchema).optional(),
  conversations: z.lazy(() => ConversationUpdateManyWithoutUserNestedInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followedByCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUncheckedUpdateManyWithoutFromNestedInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUncheckedUpdateManyWithoutToNestedInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUncheckedUpdateManyWithoutFromNestedInputSchema).optional(),
  following: z.lazy(() => FollowRelationUncheckedUpdateManyWithoutToNestedInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  appActions: z.lazy(() => AppActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdApps: z.lazy(() => AppUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  conversations: z.lazy(() => ConversationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const AppCreateWithoutStarringInputSchema: z.ZodType<Prisma.AppCreateWithoutStarringInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  avatar: z.string(),
  desc: z.string(),
  language: z.string().optional(),
  version: z.string().optional(),
  modelName: z.string(),
  isOpenSource: z.boolean().optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  creator: z.lazy(() => UserCreateNestedOneWithoutCreatedAppsInputSchema),
  tags: z.lazy(() => AppTagCreateNestedManyWithoutAppsInputSchema).optional(),
  category: z.lazy(() => AppCategoryCreateNestedOneWithoutAppInputSchema),
  actions: z.lazy(() => AppActionCreateNestedManyWithoutAppInputSchema).optional(),
  using: z.lazy(() => ConversationCreateNestedManyWithoutAppInputSchema).optional(),
  comments: z.lazy(() => AppCommentCreateNestedManyWithoutAAppInputSchema).optional(),
  state: z.lazy(() => AppStateCreateNestedOneWithoutAppInputSchema).optional()
}).strict();

export const AppUncheckedCreateWithoutStarringInputSchema: z.ZodType<Prisma.AppUncheckedCreateWithoutStarringInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  creatorId: z.string(),
  name: z.string(),
  avatar: z.string(),
  desc: z.string(),
  language: z.string().optional(),
  version: z.string().optional(),
  categoryMain: z.number().int(),
  categorySub: z.number().int(),
  modelName: z.string(),
  isOpenSource: z.boolean().optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  tags: z.lazy(() => AppTagUncheckedCreateNestedManyWithoutAppsInputSchema).optional(),
  actions: z.lazy(() => AppActionUncheckedCreateNestedManyWithoutAppInputSchema).optional(),
  using: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutAppInputSchema).optional(),
  comments: z.lazy(() => AppCommentUncheckedCreateNestedManyWithoutAAppInputSchema).optional(),
  state: z.lazy(() => AppStateUncheckedCreateNestedOneWithoutAppInputSchema).optional()
}).strict();

export const AppCreateOrConnectWithoutStarringInputSchema: z.ZodType<Prisma.AppCreateOrConnectWithoutStarringInput> = z.object({
  where: z.lazy(() => AppWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AppCreateWithoutStarringInputSchema),z.lazy(() => AppUncheckedCreateWithoutStarringInputSchema) ]),
}).strict();

export const UserCreateWithoutStarringAppInputSchema: z.ZodType<Prisma.UserCreateWithoutStarringAppInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  followedByCount: z.number().int().optional(),
  followingCount: z.number().int().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationCreateNestedManyWithoutFromInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationCreateNestedManyWithoutToInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationCreateNestedManyWithoutFromInputSchema).optional(),
  following: z.lazy(() => FollowRelationCreateNestedManyWithoutToInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageCreateNestedManyWithoutUserInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionCreateNestedManyWithoutUserInputSchema).optional(),
  tags: z.lazy(() => AppTagCreateNestedManyWithoutCreatorInputSchema).optional(),
  appComments: z.lazy(() => AppCommentCreateNestedManyWithoutUserInputSchema).optional(),
  appActions: z.lazy(() => AppActionCreateNestedManyWithoutUserInputSchema).optional(),
  createdApps: z.lazy(() => AppCreateNestedManyWithoutCreatorInputSchema).optional(),
  conversations: z.lazy(() => ConversationCreateNestedManyWithoutUserInputSchema).optional(),
  Transcation: z.lazy(() => TranscationCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutStarringAppInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutStarringAppInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  followedByCount: z.number().int().optional(),
  followingCount: z.number().int().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUncheckedCreateNestedManyWithoutFromInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUncheckedCreateNestedManyWithoutToInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUncheckedCreateNestedManyWithoutFromInputSchema).optional(),
  following: z.lazy(() => FollowRelationUncheckedCreateNestedManyWithoutToInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  tags: z.lazy(() => AppTagUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  appActions: z.lazy(() => AppActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdApps: z.lazy(() => AppUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  conversations: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutStarringAppInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutStarringAppInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutStarringAppInputSchema),z.lazy(() => UserUncheckedCreateWithoutStarringAppInputSchema) ]),
}).strict();

export const AppUpsertWithoutStarringInputSchema: z.ZodType<Prisma.AppUpsertWithoutStarringInput> = z.object({
  update: z.union([ z.lazy(() => AppUpdateWithoutStarringInputSchema),z.lazy(() => AppUncheckedUpdateWithoutStarringInputSchema) ]),
  create: z.union([ z.lazy(() => AppCreateWithoutStarringInputSchema),z.lazy(() => AppUncheckedCreateWithoutStarringInputSchema) ]),
  where: z.lazy(() => AppWhereInputSchema).optional()
}).strict();

export const AppUpdateToOneWithWhereWithoutStarringInputSchema: z.ZodType<Prisma.AppUpdateToOneWithWhereWithoutStarringInput> = z.object({
  where: z.lazy(() => AppWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AppUpdateWithoutStarringInputSchema),z.lazy(() => AppUncheckedUpdateWithoutStarringInputSchema) ]),
}).strict();

export const AppUpdateWithoutStarringInputSchema: z.ZodType<Prisma.AppUpdateWithoutStarringInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modelName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isOpenSource: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  creator: z.lazy(() => UserUpdateOneRequiredWithoutCreatedAppsNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUpdateManyWithoutAppsNestedInputSchema).optional(),
  category: z.lazy(() => AppCategoryUpdateOneRequiredWithoutAppNestedInputSchema).optional(),
  actions: z.lazy(() => AppActionUpdateManyWithoutAppNestedInputSchema).optional(),
  using: z.lazy(() => ConversationUpdateManyWithoutAppNestedInputSchema).optional(),
  comments: z.lazy(() => AppCommentUpdateManyWithoutAAppNestedInputSchema).optional(),
  state: z.lazy(() => AppStateUpdateOneWithoutAppNestedInputSchema).optional()
}).strict();

export const AppUncheckedUpdateWithoutStarringInputSchema: z.ZodType<Prisma.AppUncheckedUpdateWithoutStarringInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  creatorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryMain: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  categorySub: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  modelName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isOpenSource: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  tags: z.lazy(() => AppTagUncheckedUpdateManyWithoutAppsNestedInputSchema).optional(),
  actions: z.lazy(() => AppActionUncheckedUpdateManyWithoutAppNestedInputSchema).optional(),
  using: z.lazy(() => ConversationUncheckedUpdateManyWithoutAppNestedInputSchema).optional(),
  comments: z.lazy(() => AppCommentUncheckedUpdateManyWithoutAAppNestedInputSchema).optional(),
  state: z.lazy(() => AppStateUncheckedUpdateOneWithoutAppNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutStarringAppInputSchema: z.ZodType<Prisma.UserUpsertWithoutStarringAppInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutStarringAppInputSchema),z.lazy(() => UserUncheckedUpdateWithoutStarringAppInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutStarringAppInputSchema),z.lazy(() => UserUncheckedCreateWithoutStarringAppInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutStarringAppInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutStarringAppInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutStarringAppInputSchema),z.lazy(() => UserUncheckedUpdateWithoutStarringAppInputSchema) ]),
}).strict();

export const UserUpdateWithoutStarringAppInputSchema: z.ZodType<Prisma.UserUpdateWithoutStarringAppInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followedByCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUpdateManyWithoutFromNestedInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUpdateManyWithoutToNestedInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUpdateManyWithoutFromNestedInputSchema).optional(),
  following: z.lazy(() => FollowRelationUpdateManyWithoutToNestedInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUpdateManyWithoutUserNestedInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUpdateManyWithoutUserNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUpdateManyWithoutCreatorNestedInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUpdateManyWithoutUserNestedInputSchema).optional(),
  appActions: z.lazy(() => AppActionUpdateManyWithoutUserNestedInputSchema).optional(),
  createdApps: z.lazy(() => AppUpdateManyWithoutCreatorNestedInputSchema).optional(),
  conversations: z.lazy(() => ConversationUpdateManyWithoutUserNestedInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutStarringAppInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutStarringAppInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followedByCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUncheckedUpdateManyWithoutFromNestedInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUncheckedUpdateManyWithoutToNestedInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUncheckedUpdateManyWithoutFromNestedInputSchema).optional(),
  following: z.lazy(() => FollowRelationUncheckedUpdateManyWithoutToNestedInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  appActions: z.lazy(() => AppActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdApps: z.lazy(() => AppUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  conversations: z.lazy(() => ConversationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Transcation: z.lazy(() => TranscationUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutTranscationInputSchema: z.ZodType<Prisma.UserCreateWithoutTranscationInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  followedByCount: z.number().int().optional(),
  followingCount: z.number().int().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationCreateNestedManyWithoutFromInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationCreateNestedManyWithoutToInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationCreateNestedManyWithoutFromInputSchema).optional(),
  following: z.lazy(() => FollowRelationCreateNestedManyWithoutToInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageCreateNestedManyWithoutUserInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionCreateNestedManyWithoutUserInputSchema).optional(),
  tags: z.lazy(() => AppTagCreateNestedManyWithoutCreatorInputSchema).optional(),
  appComments: z.lazy(() => AppCommentCreateNestedManyWithoutUserInputSchema).optional(),
  appActions: z.lazy(() => AppActionCreateNestedManyWithoutUserInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppCreateNestedManyWithoutUserInputSchema).optional(),
  createdApps: z.lazy(() => AppCreateNestedManyWithoutCreatorInputSchema).optional(),
  conversations: z.lazy(() => ConversationCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutTranscationInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTranscationInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  balance: z.number().int().optional(),
  followedByCount: z.number().int().optional(),
  followingCount: z.number().int().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUncheckedCreateNestedManyWithoutFromInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUncheckedCreateNestedManyWithoutToInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUncheckedCreateNestedManyWithoutFromInputSchema).optional(),
  following: z.lazy(() => FollowRelationUncheckedCreateNestedManyWithoutToInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  tags: z.lazy(() => AppTagUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  appActions: z.lazy(() => AppActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdApps: z.lazy(() => AppUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
  conversations: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutTranscationInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTranscationInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutTranscationInputSchema),z.lazy(() => UserUncheckedCreateWithoutTranscationInputSchema) ]),
}).strict();

export const UserUpsertWithoutTranscationInputSchema: z.ZodType<Prisma.UserUpsertWithoutTranscationInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutTranscationInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTranscationInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutTranscationInputSchema),z.lazy(() => UserUncheckedCreateWithoutTranscationInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutTranscationInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutTranscationInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutTranscationInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTranscationInputSchema) ]),
}).strict();

export const UserUpdateWithoutTranscationInputSchema: z.ZodType<Prisma.UserUpdateWithoutTranscationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followedByCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUpdateManyWithoutFromNestedInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUpdateManyWithoutToNestedInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUpdateManyWithoutFromNestedInputSchema).optional(),
  following: z.lazy(() => FollowRelationUpdateManyWithoutToNestedInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUpdateManyWithoutUserNestedInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUpdateManyWithoutUserNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUpdateManyWithoutCreatorNestedInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUpdateManyWithoutUserNestedInputSchema).optional(),
  appActions: z.lazy(() => AppActionUpdateManyWithoutUserNestedInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUpdateManyWithoutUserNestedInputSchema).optional(),
  createdApps: z.lazy(() => AppUpdateManyWithoutCreatorNestedInputSchema).optional(),
  conversations: z.lazy(() => ConversationUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutTranscationInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutTranscationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followedByCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  followingCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  invitedFrom: z.lazy(() => InvitationRelationUncheckedUpdateManyWithoutFromNestedInputSchema).optional(),
  invitedTo: z.lazy(() => InvitationRelationUncheckedUpdateManyWithoutToNestedInputSchema).optional(),
  followedBy: z.lazy(() => FollowRelationUncheckedUpdateManyWithoutFromNestedInputSchema).optional(),
  following: z.lazy(() => FollowRelationUncheckedUpdateManyWithoutToNestedInputSchema).optional(),
  chatMessages: z.lazy(() => ChatMessageUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  chatMessageActions: z.lazy(() => ChatMessageActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  appComments: z.lazy(() => AppCommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  appActions: z.lazy(() => AppActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  StarringApp: z.lazy(() => StarringAppUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdApps: z.lazy(() => AppUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
  conversations: z.lazy(() => ConversationUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  refresh_token_expires_in: z.number().int().optional().nullable()
}).strict();

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  refresh_token_expires_in: z.number().int().optional().nullable()
}).strict();

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AccountCreateManyUserInputSchema),z.lazy(() => AccountCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyUserInputSchema),z.lazy(() => SessionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const InvitationRelationCreateWithoutFromInputSchema: z.ZodType<Prisma.InvitationRelationCreateWithoutFromInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  status: z.lazy(() => InvitationStatusSchema).optional(),
  to: z.lazy(() => UserCreateNestedOneWithoutInvitedToInputSchema).optional()
}).strict();

export const InvitationRelationUncheckedCreateWithoutFromInputSchema: z.ZodType<Prisma.InvitationRelationUncheckedCreateWithoutFromInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  status: z.lazy(() => InvitationStatusSchema).optional(),
  toId: z.string().optional().nullable()
}).strict();

export const InvitationRelationCreateOrConnectWithoutFromInputSchema: z.ZodType<Prisma.InvitationRelationCreateOrConnectWithoutFromInput> = z.object({
  where: z.lazy(() => InvitationRelationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InvitationRelationCreateWithoutFromInputSchema),z.lazy(() => InvitationRelationUncheckedCreateWithoutFromInputSchema) ]),
}).strict();

export const InvitationRelationCreateManyFromInputEnvelopeSchema: z.ZodType<Prisma.InvitationRelationCreateManyFromInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => InvitationRelationCreateManyFromInputSchema),z.lazy(() => InvitationRelationCreateManyFromInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const InvitationRelationCreateWithoutToInputSchema: z.ZodType<Prisma.InvitationRelationCreateWithoutToInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  status: z.lazy(() => InvitationStatusSchema).optional(),
  from: z.lazy(() => UserCreateNestedOneWithoutInvitedFromInputSchema).optional()
}).strict();

export const InvitationRelationUncheckedCreateWithoutToInputSchema: z.ZodType<Prisma.InvitationRelationUncheckedCreateWithoutToInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  status: z.lazy(() => InvitationStatusSchema).optional(),
  fromId: z.string()
}).strict();

export const InvitationRelationCreateOrConnectWithoutToInputSchema: z.ZodType<Prisma.InvitationRelationCreateOrConnectWithoutToInput> = z.object({
  where: z.lazy(() => InvitationRelationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InvitationRelationCreateWithoutToInputSchema),z.lazy(() => InvitationRelationUncheckedCreateWithoutToInputSchema) ]),
}).strict();

export const InvitationRelationCreateManyToInputEnvelopeSchema: z.ZodType<Prisma.InvitationRelationCreateManyToInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => InvitationRelationCreateManyToInputSchema),z.lazy(() => InvitationRelationCreateManyToInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FollowRelationCreateWithoutFromInputSchema: z.ZodType<Prisma.FollowRelationCreateWithoutFromInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  to: z.lazy(() => UserCreateNestedOneWithoutFollowingInputSchema)
}).strict();

export const FollowRelationUncheckedCreateWithoutFromInputSchema: z.ZodType<Prisma.FollowRelationUncheckedCreateWithoutFromInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  toId: z.string()
}).strict();

export const FollowRelationCreateOrConnectWithoutFromInputSchema: z.ZodType<Prisma.FollowRelationCreateOrConnectWithoutFromInput> = z.object({
  where: z.lazy(() => FollowRelationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FollowRelationCreateWithoutFromInputSchema),z.lazy(() => FollowRelationUncheckedCreateWithoutFromInputSchema) ]),
}).strict();

export const FollowRelationCreateManyFromInputEnvelopeSchema: z.ZodType<Prisma.FollowRelationCreateManyFromInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FollowRelationCreateManyFromInputSchema),z.lazy(() => FollowRelationCreateManyFromInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FollowRelationCreateWithoutToInputSchema: z.ZodType<Prisma.FollowRelationCreateWithoutToInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  from: z.lazy(() => UserCreateNestedOneWithoutFollowedByInputSchema)
}).strict();

export const FollowRelationUncheckedCreateWithoutToInputSchema: z.ZodType<Prisma.FollowRelationUncheckedCreateWithoutToInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fromId: z.string()
}).strict();

export const FollowRelationCreateOrConnectWithoutToInputSchema: z.ZodType<Prisma.FollowRelationCreateOrConnectWithoutToInput> = z.object({
  where: z.lazy(() => FollowRelationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FollowRelationCreateWithoutToInputSchema),z.lazy(() => FollowRelationUncheckedCreateWithoutToInputSchema) ]),
}).strict();

export const FollowRelationCreateManyToInputEnvelopeSchema: z.ZodType<Prisma.FollowRelationCreateManyToInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FollowRelationCreateManyToInputSchema),z.lazy(() => FollowRelationCreateManyToInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ChatMessageCreateWithoutUserInputSchema: z.ZodType<Prisma.ChatMessageCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => PromptRoleTypeSchema).optional(),
  content: z.string(),
  format: z.lazy(() => ChatMessageFormatTypeSchema).optional(),
  shortId: z.string().optional(),
  namespace: z.string().optional().nullable(),
  userActionOnMessage: z.lazy(() => ChatMessageActionCreateNestedManyWithoutMessageInputSchema).optional(),
  conversation: z.lazy(() => ConversationCreateNestedOneWithoutMessagesInputSchema)
}).strict();

export const ChatMessageUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ChatMessageUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => PromptRoleTypeSchema).optional(),
  content: z.string(),
  format: z.lazy(() => ChatMessageFormatTypeSchema).optional(),
  conversationId: z.string(),
  shortId: z.string().optional(),
  namespace: z.string().optional().nullable(),
  userActionOnMessage: z.lazy(() => ChatMessageActionUncheckedCreateNestedManyWithoutMessageInputSchema).optional()
}).strict();

export const ChatMessageCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ChatMessageCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ChatMessageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ChatMessageCreateWithoutUserInputSchema),z.lazy(() => ChatMessageUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ChatMessageCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ChatMessageCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ChatMessageCreateManyUserInputSchema),z.lazy(() => ChatMessageCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ChatMessageActionCreateWithoutUserInputSchema: z.ZodType<Prisma.ChatMessageActionCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  action: z.string(),
  message: z.lazy(() => ChatMessageCreateNestedOneWithoutUserActionOnMessageInputSchema)
}).strict();

export const ChatMessageActionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ChatMessageActionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  messageId: z.string(),
  action: z.string()
}).strict();

export const ChatMessageActionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ChatMessageActionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ChatMessageActionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ChatMessageActionCreateWithoutUserInputSchema),z.lazy(() => ChatMessageActionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ChatMessageActionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ChatMessageActionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ChatMessageActionCreateManyUserInputSchema),z.lazy(() => ChatMessageActionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AppTagCreateWithoutCreatorInputSchema: z.ZodType<Prisma.AppTagCreateWithoutCreatorInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  name: z.string(),
  apps: z.lazy(() => AppCreateNestedManyWithoutTagsInputSchema).optional()
}).strict();

export const AppTagUncheckedCreateWithoutCreatorInputSchema: z.ZodType<Prisma.AppTagUncheckedCreateWithoutCreatorInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  name: z.string(),
  apps: z.lazy(() => AppUncheckedCreateNestedManyWithoutTagsInputSchema).optional()
}).strict();

export const AppTagCreateOrConnectWithoutCreatorInputSchema: z.ZodType<Prisma.AppTagCreateOrConnectWithoutCreatorInput> = z.object({
  where: z.lazy(() => AppTagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AppTagCreateWithoutCreatorInputSchema),z.lazy(() => AppTagUncheckedCreateWithoutCreatorInputSchema) ]),
}).strict();

export const AppTagCreateManyCreatorInputEnvelopeSchema: z.ZodType<Prisma.AppTagCreateManyCreatorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AppTagCreateManyCreatorInputSchema),z.lazy(() => AppTagCreateManyCreatorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AppCommentCreateWithoutUserInputSchema: z.ZodType<Prisma.AppCommentCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  title: z.string().optional().nullable(),
  content: z.string(),
  rate: z.number().int().optional().nullable(),
  aApp: z.lazy(() => AppCreateNestedOneWithoutCommentsInputSchema)
}).strict();

export const AppCommentUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AppCommentUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  appId: z.string(),
  title: z.string().optional().nullable(),
  content: z.string(),
  rate: z.number().int().optional().nullable()
}).strict();

export const AppCommentCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AppCommentCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AppCommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AppCommentCreateWithoutUserInputSchema),z.lazy(() => AppCommentUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AppCommentCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AppCommentCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AppCommentCreateManyUserInputSchema),z.lazy(() => AppCommentCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AppActionCreateWithoutUserInputSchema: z.ZodType<Prisma.AppActionCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  action: z.string(),
  app: z.lazy(() => AppCreateNestedOneWithoutActionsInputSchema)
}).strict();

export const AppActionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AppActionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  appId: z.string(),
  action: z.string()
}).strict();

export const AppActionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AppActionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AppActionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AppActionCreateWithoutUserInputSchema),z.lazy(() => AppActionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AppActionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AppActionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AppActionCreateManyUserInputSchema),z.lazy(() => AppActionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const StarringAppCreateWithoutUserInputSchema: z.ZodType<Prisma.StarringAppCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isActive: z.boolean().optional(),
  app: z.lazy(() => AppCreateNestedOneWithoutStarringInputSchema)
}).strict();

export const StarringAppUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.StarringAppUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  appId: z.string(),
  isActive: z.boolean().optional()
}).strict();

export const StarringAppCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.StarringAppCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => StarringAppWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StarringAppCreateWithoutUserInputSchema),z.lazy(() => StarringAppUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const StarringAppCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.StarringAppCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => StarringAppCreateManyUserInputSchema),z.lazy(() => StarringAppCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AppCreateWithoutCreatorInputSchema: z.ZodType<Prisma.AppCreateWithoutCreatorInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  avatar: z.string(),
  desc: z.string(),
  language: z.string().optional(),
  version: z.string().optional(),
  modelName: z.string(),
  isOpenSource: z.boolean().optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  tags: z.lazy(() => AppTagCreateNestedManyWithoutAppsInputSchema).optional(),
  category: z.lazy(() => AppCategoryCreateNestedOneWithoutAppInputSchema),
  actions: z.lazy(() => AppActionCreateNestedManyWithoutAppInputSchema).optional(),
  using: z.lazy(() => ConversationCreateNestedManyWithoutAppInputSchema).optional(),
  starring: z.lazy(() => StarringAppCreateNestedManyWithoutAppInputSchema).optional(),
  comments: z.lazy(() => AppCommentCreateNestedManyWithoutAAppInputSchema).optional(),
  state: z.lazy(() => AppStateCreateNestedOneWithoutAppInputSchema).optional()
}).strict();

export const AppUncheckedCreateWithoutCreatorInputSchema: z.ZodType<Prisma.AppUncheckedCreateWithoutCreatorInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  avatar: z.string(),
  desc: z.string(),
  language: z.string().optional(),
  version: z.string().optional(),
  categoryMain: z.number().int(),
  categorySub: z.number().int(),
  modelName: z.string(),
  isOpenSource: z.boolean().optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  tags: z.lazy(() => AppTagUncheckedCreateNestedManyWithoutAppsInputSchema).optional(),
  actions: z.lazy(() => AppActionUncheckedCreateNestedManyWithoutAppInputSchema).optional(),
  using: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutAppInputSchema).optional(),
  starring: z.lazy(() => StarringAppUncheckedCreateNestedManyWithoutAppInputSchema).optional(),
  comments: z.lazy(() => AppCommentUncheckedCreateNestedManyWithoutAAppInputSchema).optional(),
  state: z.lazy(() => AppStateUncheckedCreateNestedOneWithoutAppInputSchema).optional()
}).strict();

export const AppCreateOrConnectWithoutCreatorInputSchema: z.ZodType<Prisma.AppCreateOrConnectWithoutCreatorInput> = z.object({
  where: z.lazy(() => AppWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AppCreateWithoutCreatorInputSchema),z.lazy(() => AppUncheckedCreateWithoutCreatorInputSchema) ]),
}).strict();

export const AppCreateManyCreatorInputEnvelopeSchema: z.ZodType<Prisma.AppCreateManyCreatorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AppCreateManyCreatorInputSchema),z.lazy(() => AppCreateManyCreatorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ConversationCreateWithoutUserInputSchema: z.ZodType<Prisma.ConversationCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isActive: z.boolean().optional(),
  pinned: z.boolean().optional(),
  messages: z.lazy(() => ChatMessageCreateNestedManyWithoutConversationInputSchema).optional(),
  app: z.lazy(() => AppCreateNestedOneWithoutUsingInputSchema)
}).strict();

export const ConversationUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ConversationUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isActive: z.boolean().optional(),
  appId: z.string(),
  pinned: z.boolean().optional(),
  messages: z.lazy(() => ChatMessageUncheckedCreateNestedManyWithoutConversationInputSchema).optional()
}).strict();

export const ConversationCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ConversationCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ConversationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ConversationCreateWithoutUserInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ConversationCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ConversationCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ConversationCreateManyUserInputSchema),z.lazy(() => ConversationCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TranscationCreateWithoutUserInputSchema: z.ZodType<Prisma.TranscationCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const TranscationUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.TranscationUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const TranscationCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.TranscationCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => TranscationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TranscationCreateWithoutUserInputSchema),z.lazy(() => TranscationUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const TranscationCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.TranscationCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TranscationCreateManyUserInputSchema),z.lazy(() => TranscationCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateManyMutationInputSchema),z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  refresh_token_expires_in: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const InvitationRelationUpsertWithWhereUniqueWithoutFromInputSchema: z.ZodType<Prisma.InvitationRelationUpsertWithWhereUniqueWithoutFromInput> = z.object({
  where: z.lazy(() => InvitationRelationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => InvitationRelationUpdateWithoutFromInputSchema),z.lazy(() => InvitationRelationUncheckedUpdateWithoutFromInputSchema) ]),
  create: z.union([ z.lazy(() => InvitationRelationCreateWithoutFromInputSchema),z.lazy(() => InvitationRelationUncheckedCreateWithoutFromInputSchema) ]),
}).strict();

export const InvitationRelationUpdateWithWhereUniqueWithoutFromInputSchema: z.ZodType<Prisma.InvitationRelationUpdateWithWhereUniqueWithoutFromInput> = z.object({
  where: z.lazy(() => InvitationRelationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => InvitationRelationUpdateWithoutFromInputSchema),z.lazy(() => InvitationRelationUncheckedUpdateWithoutFromInputSchema) ]),
}).strict();

export const InvitationRelationUpdateManyWithWhereWithoutFromInputSchema: z.ZodType<Prisma.InvitationRelationUpdateManyWithWhereWithoutFromInput> = z.object({
  where: z.lazy(() => InvitationRelationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => InvitationRelationUpdateManyMutationInputSchema),z.lazy(() => InvitationRelationUncheckedUpdateManyWithoutFromInputSchema) ]),
}).strict();

export const InvitationRelationScalarWhereInputSchema: z.ZodType<Prisma.InvitationRelationScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => InvitationRelationScalarWhereInputSchema),z.lazy(() => InvitationRelationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvitationRelationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvitationRelationScalarWhereInputSchema),z.lazy(() => InvitationRelationScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumInvitationStatusFilterSchema),z.lazy(() => InvitationStatusSchema) ]).optional(),
  fromId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  toId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const InvitationRelationUpsertWithWhereUniqueWithoutToInputSchema: z.ZodType<Prisma.InvitationRelationUpsertWithWhereUniqueWithoutToInput> = z.object({
  where: z.lazy(() => InvitationRelationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => InvitationRelationUpdateWithoutToInputSchema),z.lazy(() => InvitationRelationUncheckedUpdateWithoutToInputSchema) ]),
  create: z.union([ z.lazy(() => InvitationRelationCreateWithoutToInputSchema),z.lazy(() => InvitationRelationUncheckedCreateWithoutToInputSchema) ]),
}).strict();

export const InvitationRelationUpdateWithWhereUniqueWithoutToInputSchema: z.ZodType<Prisma.InvitationRelationUpdateWithWhereUniqueWithoutToInput> = z.object({
  where: z.lazy(() => InvitationRelationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => InvitationRelationUpdateWithoutToInputSchema),z.lazy(() => InvitationRelationUncheckedUpdateWithoutToInputSchema) ]),
}).strict();

export const InvitationRelationUpdateManyWithWhereWithoutToInputSchema: z.ZodType<Prisma.InvitationRelationUpdateManyWithWhereWithoutToInput> = z.object({
  where: z.lazy(() => InvitationRelationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => InvitationRelationUpdateManyMutationInputSchema),z.lazy(() => InvitationRelationUncheckedUpdateManyWithoutToInputSchema) ]),
}).strict();

export const FollowRelationUpsertWithWhereUniqueWithoutFromInputSchema: z.ZodType<Prisma.FollowRelationUpsertWithWhereUniqueWithoutFromInput> = z.object({
  where: z.lazy(() => FollowRelationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FollowRelationUpdateWithoutFromInputSchema),z.lazy(() => FollowRelationUncheckedUpdateWithoutFromInputSchema) ]),
  create: z.union([ z.lazy(() => FollowRelationCreateWithoutFromInputSchema),z.lazy(() => FollowRelationUncheckedCreateWithoutFromInputSchema) ]),
}).strict();

export const FollowRelationUpdateWithWhereUniqueWithoutFromInputSchema: z.ZodType<Prisma.FollowRelationUpdateWithWhereUniqueWithoutFromInput> = z.object({
  where: z.lazy(() => FollowRelationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FollowRelationUpdateWithoutFromInputSchema),z.lazy(() => FollowRelationUncheckedUpdateWithoutFromInputSchema) ]),
}).strict();

export const FollowRelationUpdateManyWithWhereWithoutFromInputSchema: z.ZodType<Prisma.FollowRelationUpdateManyWithWhereWithoutFromInput> = z.object({
  where: z.lazy(() => FollowRelationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FollowRelationUpdateManyMutationInputSchema),z.lazy(() => FollowRelationUncheckedUpdateManyWithoutFromInputSchema) ]),
}).strict();

export const FollowRelationScalarWhereInputSchema: z.ZodType<Prisma.FollowRelationScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FollowRelationScalarWhereInputSchema),z.lazy(() => FollowRelationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FollowRelationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FollowRelationScalarWhereInputSchema),z.lazy(() => FollowRelationScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  fromId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  toId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const FollowRelationUpsertWithWhereUniqueWithoutToInputSchema: z.ZodType<Prisma.FollowRelationUpsertWithWhereUniqueWithoutToInput> = z.object({
  where: z.lazy(() => FollowRelationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FollowRelationUpdateWithoutToInputSchema),z.lazy(() => FollowRelationUncheckedUpdateWithoutToInputSchema) ]),
  create: z.union([ z.lazy(() => FollowRelationCreateWithoutToInputSchema),z.lazy(() => FollowRelationUncheckedCreateWithoutToInputSchema) ]),
}).strict();

export const FollowRelationUpdateWithWhereUniqueWithoutToInputSchema: z.ZodType<Prisma.FollowRelationUpdateWithWhereUniqueWithoutToInput> = z.object({
  where: z.lazy(() => FollowRelationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FollowRelationUpdateWithoutToInputSchema),z.lazy(() => FollowRelationUncheckedUpdateWithoutToInputSchema) ]),
}).strict();

export const FollowRelationUpdateManyWithWhereWithoutToInputSchema: z.ZodType<Prisma.FollowRelationUpdateManyWithWhereWithoutToInput> = z.object({
  where: z.lazy(() => FollowRelationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FollowRelationUpdateManyMutationInputSchema),z.lazy(() => FollowRelationUncheckedUpdateManyWithoutToInputSchema) ]),
}).strict();

export const ChatMessageUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ChatMessageUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ChatMessageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ChatMessageUpdateWithoutUserInputSchema),z.lazy(() => ChatMessageUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ChatMessageCreateWithoutUserInputSchema),z.lazy(() => ChatMessageUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ChatMessageUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ChatMessageUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ChatMessageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ChatMessageUpdateWithoutUserInputSchema),z.lazy(() => ChatMessageUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const ChatMessageUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ChatMessageUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ChatMessageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ChatMessageUpdateManyMutationInputSchema),z.lazy(() => ChatMessageUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const ChatMessageActionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ChatMessageActionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ChatMessageActionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ChatMessageActionUpdateWithoutUserInputSchema),z.lazy(() => ChatMessageActionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ChatMessageActionCreateWithoutUserInputSchema),z.lazy(() => ChatMessageActionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ChatMessageActionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ChatMessageActionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ChatMessageActionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ChatMessageActionUpdateWithoutUserInputSchema),z.lazy(() => ChatMessageActionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const ChatMessageActionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ChatMessageActionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ChatMessageActionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ChatMessageActionUpdateManyMutationInputSchema),z.lazy(() => ChatMessageActionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const AppTagUpsertWithWhereUniqueWithoutCreatorInputSchema: z.ZodType<Prisma.AppTagUpsertWithWhereUniqueWithoutCreatorInput> = z.object({
  where: z.lazy(() => AppTagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AppTagUpdateWithoutCreatorInputSchema),z.lazy(() => AppTagUncheckedUpdateWithoutCreatorInputSchema) ]),
  create: z.union([ z.lazy(() => AppTagCreateWithoutCreatorInputSchema),z.lazy(() => AppTagUncheckedCreateWithoutCreatorInputSchema) ]),
}).strict();

export const AppTagUpdateWithWhereUniqueWithoutCreatorInputSchema: z.ZodType<Prisma.AppTagUpdateWithWhereUniqueWithoutCreatorInput> = z.object({
  where: z.lazy(() => AppTagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AppTagUpdateWithoutCreatorInputSchema),z.lazy(() => AppTagUncheckedUpdateWithoutCreatorInputSchema) ]),
}).strict();

export const AppTagUpdateManyWithWhereWithoutCreatorInputSchema: z.ZodType<Prisma.AppTagUpdateManyWithWhereWithoutCreatorInput> = z.object({
  where: z.lazy(() => AppTagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AppTagUpdateManyMutationInputSchema),z.lazy(() => AppTagUncheckedUpdateManyWithoutCreatorInputSchema) ]),
}).strict();

export const AppCommentUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AppCommentUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AppCommentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AppCommentUpdateWithoutUserInputSchema),z.lazy(() => AppCommentUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AppCommentCreateWithoutUserInputSchema),z.lazy(() => AppCommentUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AppCommentUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AppCommentUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AppCommentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AppCommentUpdateWithoutUserInputSchema),z.lazy(() => AppCommentUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AppCommentUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AppCommentUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AppCommentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AppCommentUpdateManyMutationInputSchema),z.lazy(() => AppCommentUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const AppActionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AppActionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AppActionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AppActionUpdateWithoutUserInputSchema),z.lazy(() => AppActionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AppActionCreateWithoutUserInputSchema),z.lazy(() => AppActionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AppActionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AppActionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AppActionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AppActionUpdateWithoutUserInputSchema),z.lazy(() => AppActionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AppActionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AppActionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AppActionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AppActionUpdateManyMutationInputSchema),z.lazy(() => AppActionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const StarringAppUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.StarringAppUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => StarringAppWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => StarringAppUpdateWithoutUserInputSchema),z.lazy(() => StarringAppUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => StarringAppCreateWithoutUserInputSchema),z.lazy(() => StarringAppUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const StarringAppUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.StarringAppUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => StarringAppWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => StarringAppUpdateWithoutUserInputSchema),z.lazy(() => StarringAppUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const StarringAppUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.StarringAppUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => StarringAppScalarWhereInputSchema),
  data: z.union([ z.lazy(() => StarringAppUpdateManyMutationInputSchema),z.lazy(() => StarringAppUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const AppUpsertWithWhereUniqueWithoutCreatorInputSchema: z.ZodType<Prisma.AppUpsertWithWhereUniqueWithoutCreatorInput> = z.object({
  where: z.lazy(() => AppWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AppUpdateWithoutCreatorInputSchema),z.lazy(() => AppUncheckedUpdateWithoutCreatorInputSchema) ]),
  create: z.union([ z.lazy(() => AppCreateWithoutCreatorInputSchema),z.lazy(() => AppUncheckedCreateWithoutCreatorInputSchema) ]),
}).strict();

export const AppUpdateWithWhereUniqueWithoutCreatorInputSchema: z.ZodType<Prisma.AppUpdateWithWhereUniqueWithoutCreatorInput> = z.object({
  where: z.lazy(() => AppWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AppUpdateWithoutCreatorInputSchema),z.lazy(() => AppUncheckedUpdateWithoutCreatorInputSchema) ]),
}).strict();

export const AppUpdateManyWithWhereWithoutCreatorInputSchema: z.ZodType<Prisma.AppUpdateManyWithWhereWithoutCreatorInput> = z.object({
  where: z.lazy(() => AppScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AppUpdateManyMutationInputSchema),z.lazy(() => AppUncheckedUpdateManyWithoutCreatorInputSchema) ]),
}).strict();

export const ConversationUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ConversationUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ConversationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ConversationUpdateWithoutUserInputSchema),z.lazy(() => ConversationUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ConversationCreateWithoutUserInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ConversationUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ConversationUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ConversationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ConversationUpdateWithoutUserInputSchema),z.lazy(() => ConversationUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const ConversationUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ConversationUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ConversationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ConversationUpdateManyMutationInputSchema),z.lazy(() => ConversationUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const TranscationUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.TranscationUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => TranscationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TranscationUpdateWithoutUserInputSchema),z.lazy(() => TranscationUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => TranscationCreateWithoutUserInputSchema),z.lazy(() => TranscationUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const TranscationUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.TranscationUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => TranscationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TranscationUpdateWithoutUserInputSchema),z.lazy(() => TranscationUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const TranscationUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.TranscationUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => TranscationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TranscationUpdateManyMutationInputSchema),z.lazy(() => TranscationUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const TranscationScalarWhereInputSchema: z.ZodType<Prisma.TranscationScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TranscationScalarWhereInputSchema),z.lazy(() => TranscationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TranscationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TranscationScalarWhereInputSchema),z.lazy(() => TranscationScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const AppActionCreateManyAppInputSchema: z.ZodType<Prisma.AppActionCreateManyAppInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  userId: z.string().optional().nullable(),
  action: z.string()
}).strict();

export const ConversationCreateManyAppInputSchema: z.ZodType<Prisma.ConversationCreateManyAppInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isActive: z.boolean().optional(),
  userId: z.string(),
  pinned: z.boolean().optional()
}).strict();

export const StarringAppCreateManyAppInputSchema: z.ZodType<Prisma.StarringAppCreateManyAppInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isActive: z.boolean().optional(),
  userId: z.string()
}).strict();

export const AppCommentCreateManyAAppInputSchema: z.ZodType<Prisma.AppCommentCreateManyAAppInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  title: z.string().optional().nullable(),
  content: z.string(),
  rate: z.number().int().optional().nullable()
}).strict();

export const AppTagUpdateWithoutAppsInputSchema: z.ZodType<Prisma.AppTagUpdateWithoutAppsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  creator: z.lazy(() => UserUpdateOneWithoutTagsNestedInputSchema).optional()
}).strict();

export const AppTagUncheckedUpdateWithoutAppsInputSchema: z.ZodType<Prisma.AppTagUncheckedUpdateWithoutAppsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  creatorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AppTagUncheckedUpdateManyWithoutAppsInputSchema: z.ZodType<Prisma.AppTagUncheckedUpdateManyWithoutAppsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  creatorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AppActionUpdateWithoutAppInputSchema: z.ZodType<Prisma.AppActionUpdateWithoutAppInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutAppActionsNestedInputSchema).optional()
}).strict();

export const AppActionUncheckedUpdateWithoutAppInputSchema: z.ZodType<Prisma.AppActionUncheckedUpdateWithoutAppInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AppActionUncheckedUpdateManyWithoutAppInputSchema: z.ZodType<Prisma.AppActionUncheckedUpdateManyWithoutAppInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ConversationUpdateWithoutAppInputSchema: z.ZodType<Prisma.ConversationUpdateWithoutAppInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  pinned: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  messages: z.lazy(() => ChatMessageUpdateManyWithoutConversationNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutConversationsNestedInputSchema).optional()
}).strict();

export const ConversationUncheckedUpdateWithoutAppInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateWithoutAppInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pinned: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  messages: z.lazy(() => ChatMessageUncheckedUpdateManyWithoutConversationNestedInputSchema).optional()
}).strict();

export const ConversationUncheckedUpdateManyWithoutAppInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateManyWithoutAppInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pinned: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StarringAppUpdateWithoutAppInputSchema: z.ZodType<Prisma.StarringAppUpdateWithoutAppInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutStarringAppNestedInputSchema).optional()
}).strict();

export const StarringAppUncheckedUpdateWithoutAppInputSchema: z.ZodType<Prisma.StarringAppUncheckedUpdateWithoutAppInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StarringAppUncheckedUpdateManyWithoutAppInputSchema: z.ZodType<Prisma.StarringAppUncheckedUpdateManyWithoutAppInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AppCommentUpdateWithoutAAppInputSchema: z.ZodType<Prisma.AppCommentUpdateWithoutAAppInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rate: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAppCommentsNestedInputSchema).optional()
}).strict();

export const AppCommentUncheckedUpdateWithoutAAppInputSchema: z.ZodType<Prisma.AppCommentUncheckedUpdateWithoutAAppInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rate: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AppCommentUncheckedUpdateManyWithoutAAppInputSchema: z.ZodType<Prisma.AppCommentUncheckedUpdateManyWithoutAAppInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rate: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AppCreateManyCategoryInputSchema: z.ZodType<Prisma.AppCreateManyCategoryInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  creatorId: z.string(),
  name: z.string(),
  avatar: z.string(),
  desc: z.string(),
  language: z.string().optional(),
  version: z.string().optional(),
  modelName: z.string(),
  isOpenSource: z.boolean().optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const AppUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.AppUpdateWithoutCategoryInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modelName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isOpenSource: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  creator: z.lazy(() => UserUpdateOneRequiredWithoutCreatedAppsNestedInputSchema).optional(),
  tags: z.lazy(() => AppTagUpdateManyWithoutAppsNestedInputSchema).optional(),
  actions: z.lazy(() => AppActionUpdateManyWithoutAppNestedInputSchema).optional(),
  using: z.lazy(() => ConversationUpdateManyWithoutAppNestedInputSchema).optional(),
  starring: z.lazy(() => StarringAppUpdateManyWithoutAppNestedInputSchema).optional(),
  comments: z.lazy(() => AppCommentUpdateManyWithoutAAppNestedInputSchema).optional(),
  state: z.lazy(() => AppStateUpdateOneWithoutAppNestedInputSchema).optional()
}).strict();

export const AppUncheckedUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.AppUncheckedUpdateWithoutCategoryInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  creatorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modelName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isOpenSource: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  tags: z.lazy(() => AppTagUncheckedUpdateManyWithoutAppsNestedInputSchema).optional(),
  actions: z.lazy(() => AppActionUncheckedUpdateManyWithoutAppNestedInputSchema).optional(),
  using: z.lazy(() => ConversationUncheckedUpdateManyWithoutAppNestedInputSchema).optional(),
  starring: z.lazy(() => StarringAppUncheckedUpdateManyWithoutAppNestedInputSchema).optional(),
  comments: z.lazy(() => AppCommentUncheckedUpdateManyWithoutAAppNestedInputSchema).optional(),
  state: z.lazy(() => AppStateUncheckedUpdateOneWithoutAppNestedInputSchema).optional()
}).strict();

export const AppUncheckedUpdateManyWithoutCategoryInputSchema: z.ZodType<Prisma.AppUncheckedUpdateManyWithoutCategoryInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  creatorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modelName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isOpenSource: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const AppUpdateWithoutTagsInputSchema: z.ZodType<Prisma.AppUpdateWithoutTagsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modelName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isOpenSource: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  creator: z.lazy(() => UserUpdateOneRequiredWithoutCreatedAppsNestedInputSchema).optional(),
  category: z.lazy(() => AppCategoryUpdateOneRequiredWithoutAppNestedInputSchema).optional(),
  actions: z.lazy(() => AppActionUpdateManyWithoutAppNestedInputSchema).optional(),
  using: z.lazy(() => ConversationUpdateManyWithoutAppNestedInputSchema).optional(),
  starring: z.lazy(() => StarringAppUpdateManyWithoutAppNestedInputSchema).optional(),
  comments: z.lazy(() => AppCommentUpdateManyWithoutAAppNestedInputSchema).optional(),
  state: z.lazy(() => AppStateUpdateOneWithoutAppNestedInputSchema).optional()
}).strict();

export const AppUncheckedUpdateWithoutTagsInputSchema: z.ZodType<Prisma.AppUncheckedUpdateWithoutTagsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  creatorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryMain: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  categorySub: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  modelName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isOpenSource: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  actions: z.lazy(() => AppActionUncheckedUpdateManyWithoutAppNestedInputSchema).optional(),
  using: z.lazy(() => ConversationUncheckedUpdateManyWithoutAppNestedInputSchema).optional(),
  starring: z.lazy(() => StarringAppUncheckedUpdateManyWithoutAppNestedInputSchema).optional(),
  comments: z.lazy(() => AppCommentUncheckedUpdateManyWithoutAAppNestedInputSchema).optional(),
  state: z.lazy(() => AppStateUncheckedUpdateOneWithoutAppNestedInputSchema).optional()
}).strict();

export const AppUncheckedUpdateManyWithoutTagsInputSchema: z.ZodType<Prisma.AppUncheckedUpdateManyWithoutTagsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  creatorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryMain: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  categorySub: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  modelName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isOpenSource: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const ChatMessageActionCreateManyMessageInputSchema: z.ZodType<Prisma.ChatMessageActionCreateManyMessageInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  action: z.string()
}).strict();

export const ChatMessageActionUpdateWithoutMessageInputSchema: z.ZodType<Prisma.ChatMessageActionUpdateWithoutMessageInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutChatMessageActionsNestedInputSchema).optional()
}).strict();

export const ChatMessageActionUncheckedUpdateWithoutMessageInputSchema: z.ZodType<Prisma.ChatMessageActionUncheckedUpdateWithoutMessageInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChatMessageActionUncheckedUpdateManyWithoutMessageInputSchema: z.ZodType<Prisma.ChatMessageActionUncheckedUpdateManyWithoutMessageInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChatMessageCreateManyConversationInputSchema: z.ZodType<Prisma.ChatMessageCreateManyConversationInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string().optional().nullable(),
  role: z.lazy(() => PromptRoleTypeSchema).optional(),
  content: z.string(),
  format: z.lazy(() => ChatMessageFormatTypeSchema).optional(),
  shortId: z.string().optional(),
  namespace: z.string().optional().nullable()
}).strict();

export const ChatMessageUpdateWithoutConversationInputSchema: z.ZodType<Prisma.ChatMessageUpdateWithoutConversationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => PromptRoleTypeSchema),z.lazy(() => EnumPromptRoleTypeFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  format: z.union([ z.lazy(() => ChatMessageFormatTypeSchema),z.lazy(() => EnumChatMessageFormatTypeFieldUpdateOperationsInputSchema) ]).optional(),
  shortId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  namespace: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneWithoutChatMessagesNestedInputSchema).optional(),
  userActionOnMessage: z.lazy(() => ChatMessageActionUpdateManyWithoutMessageNestedInputSchema).optional()
}).strict();

export const ChatMessageUncheckedUpdateWithoutConversationInputSchema: z.ZodType<Prisma.ChatMessageUncheckedUpdateWithoutConversationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => PromptRoleTypeSchema),z.lazy(() => EnumPromptRoleTypeFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  format: z.union([ z.lazy(() => ChatMessageFormatTypeSchema),z.lazy(() => EnumChatMessageFormatTypeFieldUpdateOperationsInputSchema) ]).optional(),
  shortId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  namespace: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userActionOnMessage: z.lazy(() => ChatMessageActionUncheckedUpdateManyWithoutMessageNestedInputSchema).optional()
}).strict();

export const ChatMessageUncheckedUpdateManyWithoutConversationInputSchema: z.ZodType<Prisma.ChatMessageUncheckedUpdateManyWithoutConversationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => PromptRoleTypeSchema),z.lazy(() => EnumPromptRoleTypeFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  format: z.union([ z.lazy(() => ChatMessageFormatTypeSchema),z.lazy(() => EnumChatMessageFormatTypeFieldUpdateOperationsInputSchema) ]).optional(),
  shortId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  namespace: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  refresh_token_expires_in: z.number().int().optional().nullable()
}).strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const InvitationRelationCreateManyFromInputSchema: z.ZodType<Prisma.InvitationRelationCreateManyFromInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  status: z.lazy(() => InvitationStatusSchema).optional(),
  toId: z.string().optional().nullable()
}).strict();

export const InvitationRelationCreateManyToInputSchema: z.ZodType<Prisma.InvitationRelationCreateManyToInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  status: z.lazy(() => InvitationStatusSchema).optional(),
  fromId: z.string()
}).strict();

export const FollowRelationCreateManyFromInputSchema: z.ZodType<Prisma.FollowRelationCreateManyFromInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  toId: z.string()
}).strict();

export const FollowRelationCreateManyToInputSchema: z.ZodType<Prisma.FollowRelationCreateManyToInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fromId: z.string()
}).strict();

export const ChatMessageCreateManyUserInputSchema: z.ZodType<Prisma.ChatMessageCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => PromptRoleTypeSchema).optional(),
  content: z.string(),
  format: z.lazy(() => ChatMessageFormatTypeSchema).optional(),
  conversationId: z.string(),
  shortId: z.string().optional(),
  namespace: z.string().optional().nullable()
}).strict();

export const ChatMessageActionCreateManyUserInputSchema: z.ZodType<Prisma.ChatMessageActionCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  messageId: z.string(),
  action: z.string()
}).strict();

export const AppTagCreateManyCreatorInputSchema: z.ZodType<Prisma.AppTagCreateManyCreatorInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  name: z.string()
}).strict();

export const AppCommentCreateManyUserInputSchema: z.ZodType<Prisma.AppCommentCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  appId: z.string(),
  title: z.string().optional().nullable(),
  content: z.string(),
  rate: z.number().int().optional().nullable()
}).strict();

export const AppActionCreateManyUserInputSchema: z.ZodType<Prisma.AppActionCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  appId: z.string(),
  action: z.string()
}).strict();

export const StarringAppCreateManyUserInputSchema: z.ZodType<Prisma.StarringAppCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  appId: z.string(),
  isActive: z.boolean().optional()
}).strict();

export const AppCreateManyCreatorInputSchema: z.ZodType<Prisma.AppCreateManyCreatorInput> = z.object({
  id: z.string().optional(),
  platformType: z.lazy(() => PlatformTypeSchema).optional(),
  platformId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  avatar: z.string(),
  desc: z.string(),
  language: z.string().optional(),
  version: z.string().optional(),
  categoryMain: z.number().int(),
  categorySub: z.number().int(),
  modelName: z.string(),
  isOpenSource: z.boolean().optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const ConversationCreateManyUserInputSchema: z.ZodType<Prisma.ConversationCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isActive: z.boolean().optional(),
  appId: z.string(),
  pinned: z.boolean().optional()
}).strict();

export const TranscationCreateManyUserInputSchema: z.ZodType<Prisma.TranscationCreateManyUserInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refresh_token_expires_in: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refresh_token_expires_in: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refresh_token_expires_in: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvitationRelationUpdateWithoutFromInputSchema: z.ZodType<Prisma.InvitationRelationUpdateWithoutFromInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => InvitationStatusSchema),z.lazy(() => EnumInvitationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.lazy(() => UserUpdateOneWithoutInvitedToNestedInputSchema).optional()
}).strict();

export const InvitationRelationUncheckedUpdateWithoutFromInputSchema: z.ZodType<Prisma.InvitationRelationUncheckedUpdateWithoutFromInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => InvitationStatusSchema),z.lazy(() => EnumInvitationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  toId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const InvitationRelationUncheckedUpdateManyWithoutFromInputSchema: z.ZodType<Prisma.InvitationRelationUncheckedUpdateManyWithoutFromInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => InvitationStatusSchema),z.lazy(() => EnumInvitationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  toId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const InvitationRelationUpdateWithoutToInputSchema: z.ZodType<Prisma.InvitationRelationUpdateWithoutToInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => InvitationStatusSchema),z.lazy(() => EnumInvitationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  from: z.lazy(() => UserUpdateOneWithoutInvitedFromNestedInputSchema).optional()
}).strict();

export const InvitationRelationUncheckedUpdateWithoutToInputSchema: z.ZodType<Prisma.InvitationRelationUncheckedUpdateWithoutToInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => InvitationStatusSchema),z.lazy(() => EnumInvitationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  fromId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvitationRelationUncheckedUpdateManyWithoutToInputSchema: z.ZodType<Prisma.InvitationRelationUncheckedUpdateManyWithoutToInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => InvitationStatusSchema),z.lazy(() => EnumInvitationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  fromId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FollowRelationUpdateWithoutFromInputSchema: z.ZodType<Prisma.FollowRelationUpdateWithoutFromInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.lazy(() => UserUpdateOneRequiredWithoutFollowingNestedInputSchema).optional()
}).strict();

export const FollowRelationUncheckedUpdateWithoutFromInputSchema: z.ZodType<Prisma.FollowRelationUncheckedUpdateWithoutFromInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  toId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FollowRelationUncheckedUpdateManyWithoutFromInputSchema: z.ZodType<Prisma.FollowRelationUncheckedUpdateManyWithoutFromInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  toId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FollowRelationUpdateWithoutToInputSchema: z.ZodType<Prisma.FollowRelationUpdateWithoutToInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  from: z.lazy(() => UserUpdateOneRequiredWithoutFollowedByNestedInputSchema).optional()
}).strict();

export const FollowRelationUncheckedUpdateWithoutToInputSchema: z.ZodType<Prisma.FollowRelationUncheckedUpdateWithoutToInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fromId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FollowRelationUncheckedUpdateManyWithoutToInputSchema: z.ZodType<Prisma.FollowRelationUncheckedUpdateManyWithoutToInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fromId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChatMessageUpdateWithoutUserInputSchema: z.ZodType<Prisma.ChatMessageUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => PromptRoleTypeSchema),z.lazy(() => EnumPromptRoleTypeFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  format: z.union([ z.lazy(() => ChatMessageFormatTypeSchema),z.lazy(() => EnumChatMessageFormatTypeFieldUpdateOperationsInputSchema) ]).optional(),
  shortId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  namespace: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userActionOnMessage: z.lazy(() => ChatMessageActionUpdateManyWithoutMessageNestedInputSchema).optional(),
  conversation: z.lazy(() => ConversationUpdateOneRequiredWithoutMessagesNestedInputSchema).optional()
}).strict();

export const ChatMessageUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ChatMessageUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => PromptRoleTypeSchema),z.lazy(() => EnumPromptRoleTypeFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  format: z.union([ z.lazy(() => ChatMessageFormatTypeSchema),z.lazy(() => EnumChatMessageFormatTypeFieldUpdateOperationsInputSchema) ]).optional(),
  conversationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  shortId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  namespace: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userActionOnMessage: z.lazy(() => ChatMessageActionUncheckedUpdateManyWithoutMessageNestedInputSchema).optional()
}).strict();

export const ChatMessageUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.ChatMessageUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => PromptRoleTypeSchema),z.lazy(() => EnumPromptRoleTypeFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  format: z.union([ z.lazy(() => ChatMessageFormatTypeSchema),z.lazy(() => EnumChatMessageFormatTypeFieldUpdateOperationsInputSchema) ]).optional(),
  conversationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  shortId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  namespace: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ChatMessageActionUpdateWithoutUserInputSchema: z.ZodType<Prisma.ChatMessageActionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.lazy(() => ChatMessageUpdateOneRequiredWithoutUserActionOnMessageNestedInputSchema).optional()
}).strict();

export const ChatMessageActionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ChatMessageActionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  messageId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChatMessageActionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.ChatMessageActionUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  messageId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AppTagUpdateWithoutCreatorInputSchema: z.ZodType<Prisma.AppTagUpdateWithoutCreatorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  apps: z.lazy(() => AppUpdateManyWithoutTagsNestedInputSchema).optional()
}).strict();

export const AppTagUncheckedUpdateWithoutCreatorInputSchema: z.ZodType<Prisma.AppTagUncheckedUpdateWithoutCreatorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  apps: z.lazy(() => AppUncheckedUpdateManyWithoutTagsNestedInputSchema).optional()
}).strict();

export const AppTagUncheckedUpdateManyWithoutCreatorInputSchema: z.ZodType<Prisma.AppTagUncheckedUpdateManyWithoutCreatorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AppCommentUpdateWithoutUserInputSchema: z.ZodType<Prisma.AppCommentUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rate: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  aApp: z.lazy(() => AppUpdateOneRequiredWithoutCommentsNestedInputSchema).optional()
}).strict();

export const AppCommentUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AppCommentUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  appId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rate: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AppCommentUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AppCommentUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  appId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rate: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AppActionUpdateWithoutUserInputSchema: z.ZodType<Prisma.AppActionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  app: z.lazy(() => AppUpdateOneRequiredWithoutActionsNestedInputSchema).optional()
}).strict();

export const AppActionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AppActionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  appId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AppActionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AppActionUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  appId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StarringAppUpdateWithoutUserInputSchema: z.ZodType<Prisma.StarringAppUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  app: z.lazy(() => AppUpdateOneRequiredWithoutStarringNestedInputSchema).optional()
}).strict();

export const StarringAppUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.StarringAppUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  appId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StarringAppUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.StarringAppUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  appId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AppUpdateWithoutCreatorInputSchema: z.ZodType<Prisma.AppUpdateWithoutCreatorInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  modelName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isOpenSource: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  tags: z.lazy(() => AppTagUpdateManyWithoutAppsNestedInputSchema).optional(),
  category: z.lazy(() => AppCategoryUpdateOneRequiredWithoutAppNestedInputSchema).optional(),
  actions: z.lazy(() => AppActionUpdateManyWithoutAppNestedInputSchema).optional(),
  using: z.lazy(() => ConversationUpdateManyWithoutAppNestedInputSchema).optional(),
  starring: z.lazy(() => StarringAppUpdateManyWithoutAppNestedInputSchema).optional(),
  comments: z.lazy(() => AppCommentUpdateManyWithoutAAppNestedInputSchema).optional(),
  state: z.lazy(() => AppStateUpdateOneWithoutAppNestedInputSchema).optional()
}).strict();

export const AppUncheckedUpdateWithoutCreatorInputSchema: z.ZodType<Prisma.AppUncheckedUpdateWithoutCreatorInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryMain: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  categorySub: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  modelName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isOpenSource: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  tags: z.lazy(() => AppTagUncheckedUpdateManyWithoutAppsNestedInputSchema).optional(),
  actions: z.lazy(() => AppActionUncheckedUpdateManyWithoutAppNestedInputSchema).optional(),
  using: z.lazy(() => ConversationUncheckedUpdateManyWithoutAppNestedInputSchema).optional(),
  starring: z.lazy(() => StarringAppUncheckedUpdateManyWithoutAppNestedInputSchema).optional(),
  comments: z.lazy(() => AppCommentUncheckedUpdateManyWithoutAAppNestedInputSchema).optional(),
  state: z.lazy(() => AppStateUncheckedUpdateOneWithoutAppNestedInputSchema).optional()
}).strict();

export const AppUncheckedUpdateManyWithoutCreatorInputSchema: z.ZodType<Prisma.AppUncheckedUpdateManyWithoutCreatorInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  desc: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryMain: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  categorySub: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  modelName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isOpenSource: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  modelArgs: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const ConversationUpdateWithoutUserInputSchema: z.ZodType<Prisma.ConversationUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  pinned: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  messages: z.lazy(() => ChatMessageUpdateManyWithoutConversationNestedInputSchema).optional(),
  app: z.lazy(() => AppUpdateOneRequiredWithoutUsingNestedInputSchema).optional()
}).strict();

export const ConversationUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  appId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pinned: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  messages: z.lazy(() => ChatMessageUncheckedUpdateManyWithoutConversationNestedInputSchema).optional()
}).strict();

export const ConversationUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  appId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pinned: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TranscationUpdateWithoutUserInputSchema: z.ZodType<Prisma.TranscationUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TranscationUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.TranscationUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TranscationUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.TranscationUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(),AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const AppFindFirstArgsSchema: z.ZodType<Prisma.AppFindFirstArgs> = z.object({
  select: AppSelectSchema.optional(),
  include: AppIncludeSchema.optional(),
  where: AppWhereInputSchema.optional(),
  orderBy: z.union([ AppOrderByWithRelationInputSchema.array(),AppOrderByWithRelationInputSchema ]).optional(),
  cursor: AppWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AppScalarFieldEnumSchema,AppScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AppFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AppFindFirstOrThrowArgs> = z.object({
  select: AppSelectSchema.optional(),
  include: AppIncludeSchema.optional(),
  where: AppWhereInputSchema.optional(),
  orderBy: z.union([ AppOrderByWithRelationInputSchema.array(),AppOrderByWithRelationInputSchema ]).optional(),
  cursor: AppWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AppScalarFieldEnumSchema,AppScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AppFindManyArgsSchema: z.ZodType<Prisma.AppFindManyArgs> = z.object({
  select: AppSelectSchema.optional(),
  include: AppIncludeSchema.optional(),
  where: AppWhereInputSchema.optional(),
  orderBy: z.union([ AppOrderByWithRelationInputSchema.array(),AppOrderByWithRelationInputSchema ]).optional(),
  cursor: AppWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AppScalarFieldEnumSchema,AppScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AppAggregateArgsSchema: z.ZodType<Prisma.AppAggregateArgs> = z.object({
  where: AppWhereInputSchema.optional(),
  orderBy: z.union([ AppOrderByWithRelationInputSchema.array(),AppOrderByWithRelationInputSchema ]).optional(),
  cursor: AppWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AppGroupByArgsSchema: z.ZodType<Prisma.AppGroupByArgs> = z.object({
  where: AppWhereInputSchema.optional(),
  orderBy: z.union([ AppOrderByWithAggregationInputSchema.array(),AppOrderByWithAggregationInputSchema ]).optional(),
  by: AppScalarFieldEnumSchema.array(),
  having: AppScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AppFindUniqueArgsSchema: z.ZodType<Prisma.AppFindUniqueArgs> = z.object({
  select: AppSelectSchema.optional(),
  include: AppIncludeSchema.optional(),
  where: AppWhereUniqueInputSchema,
}).strict()

export const AppFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AppFindUniqueOrThrowArgs> = z.object({
  select: AppSelectSchema.optional(),
  include: AppIncludeSchema.optional(),
  where: AppWhereUniqueInputSchema,
}).strict()

export const AppActionFindFirstArgsSchema: z.ZodType<Prisma.AppActionFindFirstArgs> = z.object({
  select: AppActionSelectSchema.optional(),
  include: AppActionIncludeSchema.optional(),
  where: AppActionWhereInputSchema.optional(),
  orderBy: z.union([ AppActionOrderByWithRelationInputSchema.array(),AppActionOrderByWithRelationInputSchema ]).optional(),
  cursor: AppActionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AppActionScalarFieldEnumSchema,AppActionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AppActionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AppActionFindFirstOrThrowArgs> = z.object({
  select: AppActionSelectSchema.optional(),
  include: AppActionIncludeSchema.optional(),
  where: AppActionWhereInputSchema.optional(),
  orderBy: z.union([ AppActionOrderByWithRelationInputSchema.array(),AppActionOrderByWithRelationInputSchema ]).optional(),
  cursor: AppActionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AppActionScalarFieldEnumSchema,AppActionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AppActionFindManyArgsSchema: z.ZodType<Prisma.AppActionFindManyArgs> = z.object({
  select: AppActionSelectSchema.optional(),
  include: AppActionIncludeSchema.optional(),
  where: AppActionWhereInputSchema.optional(),
  orderBy: z.union([ AppActionOrderByWithRelationInputSchema.array(),AppActionOrderByWithRelationInputSchema ]).optional(),
  cursor: AppActionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AppActionScalarFieldEnumSchema,AppActionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AppActionAggregateArgsSchema: z.ZodType<Prisma.AppActionAggregateArgs> = z.object({
  where: AppActionWhereInputSchema.optional(),
  orderBy: z.union([ AppActionOrderByWithRelationInputSchema.array(),AppActionOrderByWithRelationInputSchema ]).optional(),
  cursor: AppActionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AppActionGroupByArgsSchema: z.ZodType<Prisma.AppActionGroupByArgs> = z.object({
  where: AppActionWhereInputSchema.optional(),
  orderBy: z.union([ AppActionOrderByWithAggregationInputSchema.array(),AppActionOrderByWithAggregationInputSchema ]).optional(),
  by: AppActionScalarFieldEnumSchema.array(),
  having: AppActionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AppActionFindUniqueArgsSchema: z.ZodType<Prisma.AppActionFindUniqueArgs> = z.object({
  select: AppActionSelectSchema.optional(),
  include: AppActionIncludeSchema.optional(),
  where: AppActionWhereUniqueInputSchema,
}).strict()

export const AppActionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AppActionFindUniqueOrThrowArgs> = z.object({
  select: AppActionSelectSchema.optional(),
  include: AppActionIncludeSchema.optional(),
  where: AppActionWhereUniqueInputSchema,
}).strict()

export const AppCategoryFindFirstArgsSchema: z.ZodType<Prisma.AppCategoryFindFirstArgs> = z.object({
  select: AppCategorySelectSchema.optional(),
  include: AppCategoryIncludeSchema.optional(),
  where: AppCategoryWhereInputSchema.optional(),
  orderBy: z.union([ AppCategoryOrderByWithRelationInputSchema.array(),AppCategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: AppCategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AppCategoryScalarFieldEnumSchema,AppCategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AppCategoryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AppCategoryFindFirstOrThrowArgs> = z.object({
  select: AppCategorySelectSchema.optional(),
  include: AppCategoryIncludeSchema.optional(),
  where: AppCategoryWhereInputSchema.optional(),
  orderBy: z.union([ AppCategoryOrderByWithRelationInputSchema.array(),AppCategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: AppCategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AppCategoryScalarFieldEnumSchema,AppCategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AppCategoryFindManyArgsSchema: z.ZodType<Prisma.AppCategoryFindManyArgs> = z.object({
  select: AppCategorySelectSchema.optional(),
  include: AppCategoryIncludeSchema.optional(),
  where: AppCategoryWhereInputSchema.optional(),
  orderBy: z.union([ AppCategoryOrderByWithRelationInputSchema.array(),AppCategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: AppCategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AppCategoryScalarFieldEnumSchema,AppCategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AppCategoryAggregateArgsSchema: z.ZodType<Prisma.AppCategoryAggregateArgs> = z.object({
  where: AppCategoryWhereInputSchema.optional(),
  orderBy: z.union([ AppCategoryOrderByWithRelationInputSchema.array(),AppCategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: AppCategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AppCategoryGroupByArgsSchema: z.ZodType<Prisma.AppCategoryGroupByArgs> = z.object({
  where: AppCategoryWhereInputSchema.optional(),
  orderBy: z.union([ AppCategoryOrderByWithAggregationInputSchema.array(),AppCategoryOrderByWithAggregationInputSchema ]).optional(),
  by: AppCategoryScalarFieldEnumSchema.array(),
  having: AppCategoryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AppCategoryFindUniqueArgsSchema: z.ZodType<Prisma.AppCategoryFindUniqueArgs> = z.object({
  select: AppCategorySelectSchema.optional(),
  include: AppCategoryIncludeSchema.optional(),
  where: AppCategoryWhereUniqueInputSchema,
}).strict()

export const AppCategoryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AppCategoryFindUniqueOrThrowArgs> = z.object({
  select: AppCategorySelectSchema.optional(),
  include: AppCategoryIncludeSchema.optional(),
  where: AppCategoryWhereUniqueInputSchema,
}).strict()

export const AppCommentFindFirstArgsSchema: z.ZodType<Prisma.AppCommentFindFirstArgs> = z.object({
  select: AppCommentSelectSchema.optional(),
  include: AppCommentIncludeSchema.optional(),
  where: AppCommentWhereInputSchema.optional(),
  orderBy: z.union([ AppCommentOrderByWithRelationInputSchema.array(),AppCommentOrderByWithRelationInputSchema ]).optional(),
  cursor: AppCommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AppCommentScalarFieldEnumSchema,AppCommentScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AppCommentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AppCommentFindFirstOrThrowArgs> = z.object({
  select: AppCommentSelectSchema.optional(),
  include: AppCommentIncludeSchema.optional(),
  where: AppCommentWhereInputSchema.optional(),
  orderBy: z.union([ AppCommentOrderByWithRelationInputSchema.array(),AppCommentOrderByWithRelationInputSchema ]).optional(),
  cursor: AppCommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AppCommentScalarFieldEnumSchema,AppCommentScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AppCommentFindManyArgsSchema: z.ZodType<Prisma.AppCommentFindManyArgs> = z.object({
  select: AppCommentSelectSchema.optional(),
  include: AppCommentIncludeSchema.optional(),
  where: AppCommentWhereInputSchema.optional(),
  orderBy: z.union([ AppCommentOrderByWithRelationInputSchema.array(),AppCommentOrderByWithRelationInputSchema ]).optional(),
  cursor: AppCommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AppCommentScalarFieldEnumSchema,AppCommentScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AppCommentAggregateArgsSchema: z.ZodType<Prisma.AppCommentAggregateArgs> = z.object({
  where: AppCommentWhereInputSchema.optional(),
  orderBy: z.union([ AppCommentOrderByWithRelationInputSchema.array(),AppCommentOrderByWithRelationInputSchema ]).optional(),
  cursor: AppCommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AppCommentGroupByArgsSchema: z.ZodType<Prisma.AppCommentGroupByArgs> = z.object({
  where: AppCommentWhereInputSchema.optional(),
  orderBy: z.union([ AppCommentOrderByWithAggregationInputSchema.array(),AppCommentOrderByWithAggregationInputSchema ]).optional(),
  by: AppCommentScalarFieldEnumSchema.array(),
  having: AppCommentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AppCommentFindUniqueArgsSchema: z.ZodType<Prisma.AppCommentFindUniqueArgs> = z.object({
  select: AppCommentSelectSchema.optional(),
  include: AppCommentIncludeSchema.optional(),
  where: AppCommentWhereUniqueInputSchema,
}).strict()

export const AppCommentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AppCommentFindUniqueOrThrowArgs> = z.object({
  select: AppCommentSelectSchema.optional(),
  include: AppCommentIncludeSchema.optional(),
  where: AppCommentWhereUniqueInputSchema,
}).strict()

export const AppStateFindFirstArgsSchema: z.ZodType<Prisma.AppStateFindFirstArgs> = z.object({
  select: AppStateSelectSchema.optional(),
  include: AppStateIncludeSchema.optional(),
  where: AppStateWhereInputSchema.optional(),
  orderBy: z.union([ AppStateOrderByWithRelationInputSchema.array(),AppStateOrderByWithRelationInputSchema ]).optional(),
  cursor: AppStateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AppStateScalarFieldEnumSchema,AppStateScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AppStateFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AppStateFindFirstOrThrowArgs> = z.object({
  select: AppStateSelectSchema.optional(),
  include: AppStateIncludeSchema.optional(),
  where: AppStateWhereInputSchema.optional(),
  orderBy: z.union([ AppStateOrderByWithRelationInputSchema.array(),AppStateOrderByWithRelationInputSchema ]).optional(),
  cursor: AppStateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AppStateScalarFieldEnumSchema,AppStateScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AppStateFindManyArgsSchema: z.ZodType<Prisma.AppStateFindManyArgs> = z.object({
  select: AppStateSelectSchema.optional(),
  include: AppStateIncludeSchema.optional(),
  where: AppStateWhereInputSchema.optional(),
  orderBy: z.union([ AppStateOrderByWithRelationInputSchema.array(),AppStateOrderByWithRelationInputSchema ]).optional(),
  cursor: AppStateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AppStateScalarFieldEnumSchema,AppStateScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AppStateAggregateArgsSchema: z.ZodType<Prisma.AppStateAggregateArgs> = z.object({
  where: AppStateWhereInputSchema.optional(),
  orderBy: z.union([ AppStateOrderByWithRelationInputSchema.array(),AppStateOrderByWithRelationInputSchema ]).optional(),
  cursor: AppStateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AppStateGroupByArgsSchema: z.ZodType<Prisma.AppStateGroupByArgs> = z.object({
  where: AppStateWhereInputSchema.optional(),
  orderBy: z.union([ AppStateOrderByWithAggregationInputSchema.array(),AppStateOrderByWithAggregationInputSchema ]).optional(),
  by: AppStateScalarFieldEnumSchema.array(),
  having: AppStateScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AppStateFindUniqueArgsSchema: z.ZodType<Prisma.AppStateFindUniqueArgs> = z.object({
  select: AppStateSelectSchema.optional(),
  include: AppStateIncludeSchema.optional(),
  where: AppStateWhereUniqueInputSchema,
}).strict()

export const AppStateFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AppStateFindUniqueOrThrowArgs> = z.object({
  select: AppStateSelectSchema.optional(),
  include: AppStateIncludeSchema.optional(),
  where: AppStateWhereUniqueInputSchema,
}).strict()

export const AppTagFindFirstArgsSchema: z.ZodType<Prisma.AppTagFindFirstArgs> = z.object({
  select: AppTagSelectSchema.optional(),
  include: AppTagIncludeSchema.optional(),
  where: AppTagWhereInputSchema.optional(),
  orderBy: z.union([ AppTagOrderByWithRelationInputSchema.array(),AppTagOrderByWithRelationInputSchema ]).optional(),
  cursor: AppTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AppTagScalarFieldEnumSchema,AppTagScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AppTagFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AppTagFindFirstOrThrowArgs> = z.object({
  select: AppTagSelectSchema.optional(),
  include: AppTagIncludeSchema.optional(),
  where: AppTagWhereInputSchema.optional(),
  orderBy: z.union([ AppTagOrderByWithRelationInputSchema.array(),AppTagOrderByWithRelationInputSchema ]).optional(),
  cursor: AppTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AppTagScalarFieldEnumSchema,AppTagScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AppTagFindManyArgsSchema: z.ZodType<Prisma.AppTagFindManyArgs> = z.object({
  select: AppTagSelectSchema.optional(),
  include: AppTagIncludeSchema.optional(),
  where: AppTagWhereInputSchema.optional(),
  orderBy: z.union([ AppTagOrderByWithRelationInputSchema.array(),AppTagOrderByWithRelationInputSchema ]).optional(),
  cursor: AppTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AppTagScalarFieldEnumSchema,AppTagScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AppTagAggregateArgsSchema: z.ZodType<Prisma.AppTagAggregateArgs> = z.object({
  where: AppTagWhereInputSchema.optional(),
  orderBy: z.union([ AppTagOrderByWithRelationInputSchema.array(),AppTagOrderByWithRelationInputSchema ]).optional(),
  cursor: AppTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AppTagGroupByArgsSchema: z.ZodType<Prisma.AppTagGroupByArgs> = z.object({
  where: AppTagWhereInputSchema.optional(),
  orderBy: z.union([ AppTagOrderByWithAggregationInputSchema.array(),AppTagOrderByWithAggregationInputSchema ]).optional(),
  by: AppTagScalarFieldEnumSchema.array(),
  having: AppTagScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AppTagFindUniqueArgsSchema: z.ZodType<Prisma.AppTagFindUniqueArgs> = z.object({
  select: AppTagSelectSchema.optional(),
  include: AppTagIncludeSchema.optional(),
  where: AppTagWhereUniqueInputSchema,
}).strict()

export const AppTagFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AppTagFindUniqueOrThrowArgs> = z.object({
  select: AppTagSelectSchema.optional(),
  include: AppTagIncludeSchema.optional(),
  where: AppTagWhereUniqueInputSchema,
}).strict()

export const ChatMessageFindFirstArgsSchema: z.ZodType<Prisma.ChatMessageFindFirstArgs> = z.object({
  select: ChatMessageSelectSchema.optional(),
  include: ChatMessageIncludeSchema.optional(),
  where: ChatMessageWhereInputSchema.optional(),
  orderBy: z.union([ ChatMessageOrderByWithRelationInputSchema.array(),ChatMessageOrderByWithRelationInputSchema ]).optional(),
  cursor: ChatMessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ChatMessageScalarFieldEnumSchema,ChatMessageScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ChatMessageFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ChatMessageFindFirstOrThrowArgs> = z.object({
  select: ChatMessageSelectSchema.optional(),
  include: ChatMessageIncludeSchema.optional(),
  where: ChatMessageWhereInputSchema.optional(),
  orderBy: z.union([ ChatMessageOrderByWithRelationInputSchema.array(),ChatMessageOrderByWithRelationInputSchema ]).optional(),
  cursor: ChatMessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ChatMessageScalarFieldEnumSchema,ChatMessageScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ChatMessageFindManyArgsSchema: z.ZodType<Prisma.ChatMessageFindManyArgs> = z.object({
  select: ChatMessageSelectSchema.optional(),
  include: ChatMessageIncludeSchema.optional(),
  where: ChatMessageWhereInputSchema.optional(),
  orderBy: z.union([ ChatMessageOrderByWithRelationInputSchema.array(),ChatMessageOrderByWithRelationInputSchema ]).optional(),
  cursor: ChatMessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ChatMessageScalarFieldEnumSchema,ChatMessageScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ChatMessageAggregateArgsSchema: z.ZodType<Prisma.ChatMessageAggregateArgs> = z.object({
  where: ChatMessageWhereInputSchema.optional(),
  orderBy: z.union([ ChatMessageOrderByWithRelationInputSchema.array(),ChatMessageOrderByWithRelationInputSchema ]).optional(),
  cursor: ChatMessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ChatMessageGroupByArgsSchema: z.ZodType<Prisma.ChatMessageGroupByArgs> = z.object({
  where: ChatMessageWhereInputSchema.optional(),
  orderBy: z.union([ ChatMessageOrderByWithAggregationInputSchema.array(),ChatMessageOrderByWithAggregationInputSchema ]).optional(),
  by: ChatMessageScalarFieldEnumSchema.array(),
  having: ChatMessageScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ChatMessageFindUniqueArgsSchema: z.ZodType<Prisma.ChatMessageFindUniqueArgs> = z.object({
  select: ChatMessageSelectSchema.optional(),
  include: ChatMessageIncludeSchema.optional(),
  where: ChatMessageWhereUniqueInputSchema,
}).strict()

export const ChatMessageFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ChatMessageFindUniqueOrThrowArgs> = z.object({
  select: ChatMessageSelectSchema.optional(),
  include: ChatMessageIncludeSchema.optional(),
  where: ChatMessageWhereUniqueInputSchema,
}).strict()

export const ChatMessageActionFindFirstArgsSchema: z.ZodType<Prisma.ChatMessageActionFindFirstArgs> = z.object({
  select: ChatMessageActionSelectSchema.optional(),
  include: ChatMessageActionIncludeSchema.optional(),
  where: ChatMessageActionWhereInputSchema.optional(),
  orderBy: z.union([ ChatMessageActionOrderByWithRelationInputSchema.array(),ChatMessageActionOrderByWithRelationInputSchema ]).optional(),
  cursor: ChatMessageActionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ChatMessageActionScalarFieldEnumSchema,ChatMessageActionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ChatMessageActionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ChatMessageActionFindFirstOrThrowArgs> = z.object({
  select: ChatMessageActionSelectSchema.optional(),
  include: ChatMessageActionIncludeSchema.optional(),
  where: ChatMessageActionWhereInputSchema.optional(),
  orderBy: z.union([ ChatMessageActionOrderByWithRelationInputSchema.array(),ChatMessageActionOrderByWithRelationInputSchema ]).optional(),
  cursor: ChatMessageActionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ChatMessageActionScalarFieldEnumSchema,ChatMessageActionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ChatMessageActionFindManyArgsSchema: z.ZodType<Prisma.ChatMessageActionFindManyArgs> = z.object({
  select: ChatMessageActionSelectSchema.optional(),
  include: ChatMessageActionIncludeSchema.optional(),
  where: ChatMessageActionWhereInputSchema.optional(),
  orderBy: z.union([ ChatMessageActionOrderByWithRelationInputSchema.array(),ChatMessageActionOrderByWithRelationInputSchema ]).optional(),
  cursor: ChatMessageActionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ChatMessageActionScalarFieldEnumSchema,ChatMessageActionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ChatMessageActionAggregateArgsSchema: z.ZodType<Prisma.ChatMessageActionAggregateArgs> = z.object({
  where: ChatMessageActionWhereInputSchema.optional(),
  orderBy: z.union([ ChatMessageActionOrderByWithRelationInputSchema.array(),ChatMessageActionOrderByWithRelationInputSchema ]).optional(),
  cursor: ChatMessageActionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ChatMessageActionGroupByArgsSchema: z.ZodType<Prisma.ChatMessageActionGroupByArgs> = z.object({
  where: ChatMessageActionWhereInputSchema.optional(),
  orderBy: z.union([ ChatMessageActionOrderByWithAggregationInputSchema.array(),ChatMessageActionOrderByWithAggregationInputSchema ]).optional(),
  by: ChatMessageActionScalarFieldEnumSchema.array(),
  having: ChatMessageActionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ChatMessageActionFindUniqueArgsSchema: z.ZodType<Prisma.ChatMessageActionFindUniqueArgs> = z.object({
  select: ChatMessageActionSelectSchema.optional(),
  include: ChatMessageActionIncludeSchema.optional(),
  where: ChatMessageActionWhereUniqueInputSchema,
}).strict()

export const ChatMessageActionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ChatMessageActionFindUniqueOrThrowArgs> = z.object({
  select: ChatMessageActionSelectSchema.optional(),
  include: ChatMessageActionIncludeSchema.optional(),
  where: ChatMessageActionWhereUniqueInputSchema,
}).strict()

export const ConversationFindFirstArgsSchema: z.ZodType<Prisma.ConversationFindFirstArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  where: ConversationWhereInputSchema.optional(),
  orderBy: z.union([ ConversationOrderByWithRelationInputSchema.array(),ConversationOrderByWithRelationInputSchema ]).optional(),
  cursor: ConversationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ConversationScalarFieldEnumSchema,ConversationScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ConversationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ConversationFindFirstOrThrowArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  where: ConversationWhereInputSchema.optional(),
  orderBy: z.union([ ConversationOrderByWithRelationInputSchema.array(),ConversationOrderByWithRelationInputSchema ]).optional(),
  cursor: ConversationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ConversationScalarFieldEnumSchema,ConversationScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ConversationFindManyArgsSchema: z.ZodType<Prisma.ConversationFindManyArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  where: ConversationWhereInputSchema.optional(),
  orderBy: z.union([ ConversationOrderByWithRelationInputSchema.array(),ConversationOrderByWithRelationInputSchema ]).optional(),
  cursor: ConversationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ConversationScalarFieldEnumSchema,ConversationScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ConversationAggregateArgsSchema: z.ZodType<Prisma.ConversationAggregateArgs> = z.object({
  where: ConversationWhereInputSchema.optional(),
  orderBy: z.union([ ConversationOrderByWithRelationInputSchema.array(),ConversationOrderByWithRelationInputSchema ]).optional(),
  cursor: ConversationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ConversationGroupByArgsSchema: z.ZodType<Prisma.ConversationGroupByArgs> = z.object({
  where: ConversationWhereInputSchema.optional(),
  orderBy: z.union([ ConversationOrderByWithAggregationInputSchema.array(),ConversationOrderByWithAggregationInputSchema ]).optional(),
  by: ConversationScalarFieldEnumSchema.array(),
  having: ConversationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ConversationFindUniqueArgsSchema: z.ZodType<Prisma.ConversationFindUniqueArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  where: ConversationWhereUniqueInputSchema,
}).strict()

export const ConversationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ConversationFindUniqueOrThrowArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  where: ConversationWhereUniqueInputSchema,
}).strict()

export const FollowRelationFindFirstArgsSchema: z.ZodType<Prisma.FollowRelationFindFirstArgs> = z.object({
  select: FollowRelationSelectSchema.optional(),
  include: FollowRelationIncludeSchema.optional(),
  where: FollowRelationWhereInputSchema.optional(),
  orderBy: z.union([ FollowRelationOrderByWithRelationInputSchema.array(),FollowRelationOrderByWithRelationInputSchema ]).optional(),
  cursor: FollowRelationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FollowRelationScalarFieldEnumSchema,FollowRelationScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const FollowRelationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FollowRelationFindFirstOrThrowArgs> = z.object({
  select: FollowRelationSelectSchema.optional(),
  include: FollowRelationIncludeSchema.optional(),
  where: FollowRelationWhereInputSchema.optional(),
  orderBy: z.union([ FollowRelationOrderByWithRelationInputSchema.array(),FollowRelationOrderByWithRelationInputSchema ]).optional(),
  cursor: FollowRelationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FollowRelationScalarFieldEnumSchema,FollowRelationScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const FollowRelationFindManyArgsSchema: z.ZodType<Prisma.FollowRelationFindManyArgs> = z.object({
  select: FollowRelationSelectSchema.optional(),
  include: FollowRelationIncludeSchema.optional(),
  where: FollowRelationWhereInputSchema.optional(),
  orderBy: z.union([ FollowRelationOrderByWithRelationInputSchema.array(),FollowRelationOrderByWithRelationInputSchema ]).optional(),
  cursor: FollowRelationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FollowRelationScalarFieldEnumSchema,FollowRelationScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const FollowRelationAggregateArgsSchema: z.ZodType<Prisma.FollowRelationAggregateArgs> = z.object({
  where: FollowRelationWhereInputSchema.optional(),
  orderBy: z.union([ FollowRelationOrderByWithRelationInputSchema.array(),FollowRelationOrderByWithRelationInputSchema ]).optional(),
  cursor: FollowRelationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const FollowRelationGroupByArgsSchema: z.ZodType<Prisma.FollowRelationGroupByArgs> = z.object({
  where: FollowRelationWhereInputSchema.optional(),
  orderBy: z.union([ FollowRelationOrderByWithAggregationInputSchema.array(),FollowRelationOrderByWithAggregationInputSchema ]).optional(),
  by: FollowRelationScalarFieldEnumSchema.array(),
  having: FollowRelationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const FollowRelationFindUniqueArgsSchema: z.ZodType<Prisma.FollowRelationFindUniqueArgs> = z.object({
  select: FollowRelationSelectSchema.optional(),
  include: FollowRelationIncludeSchema.optional(),
  where: FollowRelationWhereUniqueInputSchema,
}).strict()

export const FollowRelationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FollowRelationFindUniqueOrThrowArgs> = z.object({
  select: FollowRelationSelectSchema.optional(),
  include: FollowRelationIncludeSchema.optional(),
  where: FollowRelationWhereUniqueInputSchema,
}).strict()

export const InvitationRelationFindFirstArgsSchema: z.ZodType<Prisma.InvitationRelationFindFirstArgs> = z.object({
  select: InvitationRelationSelectSchema.optional(),
  include: InvitationRelationIncludeSchema.optional(),
  where: InvitationRelationWhereInputSchema.optional(),
  orderBy: z.union([ InvitationRelationOrderByWithRelationInputSchema.array(),InvitationRelationOrderByWithRelationInputSchema ]).optional(),
  cursor: InvitationRelationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InvitationRelationScalarFieldEnumSchema,InvitationRelationScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const InvitationRelationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.InvitationRelationFindFirstOrThrowArgs> = z.object({
  select: InvitationRelationSelectSchema.optional(),
  include: InvitationRelationIncludeSchema.optional(),
  where: InvitationRelationWhereInputSchema.optional(),
  orderBy: z.union([ InvitationRelationOrderByWithRelationInputSchema.array(),InvitationRelationOrderByWithRelationInputSchema ]).optional(),
  cursor: InvitationRelationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InvitationRelationScalarFieldEnumSchema,InvitationRelationScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const InvitationRelationFindManyArgsSchema: z.ZodType<Prisma.InvitationRelationFindManyArgs> = z.object({
  select: InvitationRelationSelectSchema.optional(),
  include: InvitationRelationIncludeSchema.optional(),
  where: InvitationRelationWhereInputSchema.optional(),
  orderBy: z.union([ InvitationRelationOrderByWithRelationInputSchema.array(),InvitationRelationOrderByWithRelationInputSchema ]).optional(),
  cursor: InvitationRelationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InvitationRelationScalarFieldEnumSchema,InvitationRelationScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const InvitationRelationAggregateArgsSchema: z.ZodType<Prisma.InvitationRelationAggregateArgs> = z.object({
  where: InvitationRelationWhereInputSchema.optional(),
  orderBy: z.union([ InvitationRelationOrderByWithRelationInputSchema.array(),InvitationRelationOrderByWithRelationInputSchema ]).optional(),
  cursor: InvitationRelationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const InvitationRelationGroupByArgsSchema: z.ZodType<Prisma.InvitationRelationGroupByArgs> = z.object({
  where: InvitationRelationWhereInputSchema.optional(),
  orderBy: z.union([ InvitationRelationOrderByWithAggregationInputSchema.array(),InvitationRelationOrderByWithAggregationInputSchema ]).optional(),
  by: InvitationRelationScalarFieldEnumSchema.array(),
  having: InvitationRelationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const InvitationRelationFindUniqueArgsSchema: z.ZodType<Prisma.InvitationRelationFindUniqueArgs> = z.object({
  select: InvitationRelationSelectSchema.optional(),
  include: InvitationRelationIncludeSchema.optional(),
  where: InvitationRelationWhereUniqueInputSchema,
}).strict()

export const InvitationRelationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.InvitationRelationFindUniqueOrThrowArgs> = z.object({
  select: InvitationRelationSelectSchema.optional(),
  include: InvitationRelationIncludeSchema.optional(),
  where: InvitationRelationWhereUniqueInputSchema,
}).strict()

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const StarringAppFindFirstArgsSchema: z.ZodType<Prisma.StarringAppFindFirstArgs> = z.object({
  select: StarringAppSelectSchema.optional(),
  include: StarringAppIncludeSchema.optional(),
  where: StarringAppWhereInputSchema.optional(),
  orderBy: z.union([ StarringAppOrderByWithRelationInputSchema.array(),StarringAppOrderByWithRelationInputSchema ]).optional(),
  cursor: StarringAppWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StarringAppScalarFieldEnumSchema,StarringAppScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const StarringAppFindFirstOrThrowArgsSchema: z.ZodType<Prisma.StarringAppFindFirstOrThrowArgs> = z.object({
  select: StarringAppSelectSchema.optional(),
  include: StarringAppIncludeSchema.optional(),
  where: StarringAppWhereInputSchema.optional(),
  orderBy: z.union([ StarringAppOrderByWithRelationInputSchema.array(),StarringAppOrderByWithRelationInputSchema ]).optional(),
  cursor: StarringAppWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StarringAppScalarFieldEnumSchema,StarringAppScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const StarringAppFindManyArgsSchema: z.ZodType<Prisma.StarringAppFindManyArgs> = z.object({
  select: StarringAppSelectSchema.optional(),
  include: StarringAppIncludeSchema.optional(),
  where: StarringAppWhereInputSchema.optional(),
  orderBy: z.union([ StarringAppOrderByWithRelationInputSchema.array(),StarringAppOrderByWithRelationInputSchema ]).optional(),
  cursor: StarringAppWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StarringAppScalarFieldEnumSchema,StarringAppScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const StarringAppAggregateArgsSchema: z.ZodType<Prisma.StarringAppAggregateArgs> = z.object({
  where: StarringAppWhereInputSchema.optional(),
  orderBy: z.union([ StarringAppOrderByWithRelationInputSchema.array(),StarringAppOrderByWithRelationInputSchema ]).optional(),
  cursor: StarringAppWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const StarringAppGroupByArgsSchema: z.ZodType<Prisma.StarringAppGroupByArgs> = z.object({
  where: StarringAppWhereInputSchema.optional(),
  orderBy: z.union([ StarringAppOrderByWithAggregationInputSchema.array(),StarringAppOrderByWithAggregationInputSchema ]).optional(),
  by: StarringAppScalarFieldEnumSchema.array(),
  having: StarringAppScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const StarringAppFindUniqueArgsSchema: z.ZodType<Prisma.StarringAppFindUniqueArgs> = z.object({
  select: StarringAppSelectSchema.optional(),
  include: StarringAppIncludeSchema.optional(),
  where: StarringAppWhereUniqueInputSchema,
}).strict()

export const StarringAppFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.StarringAppFindUniqueOrThrowArgs> = z.object({
  select: StarringAppSelectSchema.optional(),
  include: StarringAppIncludeSchema.optional(),
  where: StarringAppWhereUniqueInputSchema,
}).strict()

export const TranscationFindFirstArgsSchema: z.ZodType<Prisma.TranscationFindFirstArgs> = z.object({
  select: TranscationSelectSchema.optional(),
  include: TranscationIncludeSchema.optional(),
  where: TranscationWhereInputSchema.optional(),
  orderBy: z.union([ TranscationOrderByWithRelationInputSchema.array(),TranscationOrderByWithRelationInputSchema ]).optional(),
  cursor: TranscationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TranscationScalarFieldEnumSchema,TranscationScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const TranscationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TranscationFindFirstOrThrowArgs> = z.object({
  select: TranscationSelectSchema.optional(),
  include: TranscationIncludeSchema.optional(),
  where: TranscationWhereInputSchema.optional(),
  orderBy: z.union([ TranscationOrderByWithRelationInputSchema.array(),TranscationOrderByWithRelationInputSchema ]).optional(),
  cursor: TranscationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TranscationScalarFieldEnumSchema,TranscationScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const TranscationFindManyArgsSchema: z.ZodType<Prisma.TranscationFindManyArgs> = z.object({
  select: TranscationSelectSchema.optional(),
  include: TranscationIncludeSchema.optional(),
  where: TranscationWhereInputSchema.optional(),
  orderBy: z.union([ TranscationOrderByWithRelationInputSchema.array(),TranscationOrderByWithRelationInputSchema ]).optional(),
  cursor: TranscationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TranscationScalarFieldEnumSchema,TranscationScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const TranscationAggregateArgsSchema: z.ZodType<Prisma.TranscationAggregateArgs> = z.object({
  where: TranscationWhereInputSchema.optional(),
  orderBy: z.union([ TranscationOrderByWithRelationInputSchema.array(),TranscationOrderByWithRelationInputSchema ]).optional(),
  cursor: TranscationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const TranscationGroupByArgsSchema: z.ZodType<Prisma.TranscationGroupByArgs> = z.object({
  where: TranscationWhereInputSchema.optional(),
  orderBy: z.union([ TranscationOrderByWithAggregationInputSchema.array(),TranscationOrderByWithAggregationInputSchema ]).optional(),
  by: TranscationScalarFieldEnumSchema.array(),
  having: TranscationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const TranscationFindUniqueArgsSchema: z.ZodType<Prisma.TranscationFindUniqueArgs> = z.object({
  select: TranscationSelectSchema.optional(),
  include: TranscationIncludeSchema.optional(),
  where: TranscationWhereUniqueInputSchema,
}).strict()

export const TranscationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TranscationFindUniqueOrThrowArgs> = z.object({
  select: TranscationSelectSchema.optional(),
  include: TranscationIncludeSchema.optional(),
  where: TranscationWhereUniqueInputSchema,
}).strict()

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const VerificationTokenFindFirstArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const VerificationTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const VerificationTokenFindManyArgsSchema: z.ZodType<Prisma.VerificationTokenFindManyArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const VerificationTokenAggregateArgsSchema: z.ZodType<Prisma.VerificationTokenAggregateArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const VerificationTokenGroupByArgsSchema: z.ZodType<Prisma.VerificationTokenGroupByArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithAggregationInputSchema.array(),VerificationTokenOrderByWithAggregationInputSchema ]).optional(),
  by: VerificationTokenScalarFieldEnumSchema.array(),
  having: VerificationTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const VerificationTokenFindUniqueArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const VerificationTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
}).strict()

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
}).strict()

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
}).strict()

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
}).strict()

export const AppCreateArgsSchema: z.ZodType<Prisma.AppCreateArgs> = z.object({
  select: AppSelectSchema.optional(),
  include: AppIncludeSchema.optional(),
  data: z.union([ AppCreateInputSchema,AppUncheckedCreateInputSchema ]),
}).strict()

export const AppUpsertArgsSchema: z.ZodType<Prisma.AppUpsertArgs> = z.object({
  select: AppSelectSchema.optional(),
  include: AppIncludeSchema.optional(),
  where: AppWhereUniqueInputSchema,
  create: z.union([ AppCreateInputSchema,AppUncheckedCreateInputSchema ]),
  update: z.union([ AppUpdateInputSchema,AppUncheckedUpdateInputSchema ]),
}).strict()

export const AppCreateManyArgsSchema: z.ZodType<Prisma.AppCreateManyArgs> = z.object({
  data: z.union([ AppCreateManyInputSchema,AppCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const AppDeleteArgsSchema: z.ZodType<Prisma.AppDeleteArgs> = z.object({
  select: AppSelectSchema.optional(),
  include: AppIncludeSchema.optional(),
  where: AppWhereUniqueInputSchema,
}).strict()

export const AppUpdateArgsSchema: z.ZodType<Prisma.AppUpdateArgs> = z.object({
  select: AppSelectSchema.optional(),
  include: AppIncludeSchema.optional(),
  data: z.union([ AppUpdateInputSchema,AppUncheckedUpdateInputSchema ]),
  where: AppWhereUniqueInputSchema,
}).strict()

export const AppUpdateManyArgsSchema: z.ZodType<Prisma.AppUpdateManyArgs> = z.object({
  data: z.union([ AppUpdateManyMutationInputSchema,AppUncheckedUpdateManyInputSchema ]),
  where: AppWhereInputSchema.optional(),
}).strict()

export const AppDeleteManyArgsSchema: z.ZodType<Prisma.AppDeleteManyArgs> = z.object({
  where: AppWhereInputSchema.optional(),
}).strict()

export const AppActionCreateArgsSchema: z.ZodType<Prisma.AppActionCreateArgs> = z.object({
  select: AppActionSelectSchema.optional(),
  include: AppActionIncludeSchema.optional(),
  data: z.union([ AppActionCreateInputSchema,AppActionUncheckedCreateInputSchema ]),
}).strict()

export const AppActionUpsertArgsSchema: z.ZodType<Prisma.AppActionUpsertArgs> = z.object({
  select: AppActionSelectSchema.optional(),
  include: AppActionIncludeSchema.optional(),
  where: AppActionWhereUniqueInputSchema,
  create: z.union([ AppActionCreateInputSchema,AppActionUncheckedCreateInputSchema ]),
  update: z.union([ AppActionUpdateInputSchema,AppActionUncheckedUpdateInputSchema ]),
}).strict()

export const AppActionCreateManyArgsSchema: z.ZodType<Prisma.AppActionCreateManyArgs> = z.object({
  data: z.union([ AppActionCreateManyInputSchema,AppActionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const AppActionDeleteArgsSchema: z.ZodType<Prisma.AppActionDeleteArgs> = z.object({
  select: AppActionSelectSchema.optional(),
  include: AppActionIncludeSchema.optional(),
  where: AppActionWhereUniqueInputSchema,
}).strict()

export const AppActionUpdateArgsSchema: z.ZodType<Prisma.AppActionUpdateArgs> = z.object({
  select: AppActionSelectSchema.optional(),
  include: AppActionIncludeSchema.optional(),
  data: z.union([ AppActionUpdateInputSchema,AppActionUncheckedUpdateInputSchema ]),
  where: AppActionWhereUniqueInputSchema,
}).strict()

export const AppActionUpdateManyArgsSchema: z.ZodType<Prisma.AppActionUpdateManyArgs> = z.object({
  data: z.union([ AppActionUpdateManyMutationInputSchema,AppActionUncheckedUpdateManyInputSchema ]),
  where: AppActionWhereInputSchema.optional(),
}).strict()

export const AppActionDeleteManyArgsSchema: z.ZodType<Prisma.AppActionDeleteManyArgs> = z.object({
  where: AppActionWhereInputSchema.optional(),
}).strict()

export const AppCategoryCreateArgsSchema: z.ZodType<Prisma.AppCategoryCreateArgs> = z.object({
  select: AppCategorySelectSchema.optional(),
  include: AppCategoryIncludeSchema.optional(),
  data: z.union([ AppCategoryCreateInputSchema,AppCategoryUncheckedCreateInputSchema ]),
}).strict()

export const AppCategoryUpsertArgsSchema: z.ZodType<Prisma.AppCategoryUpsertArgs> = z.object({
  select: AppCategorySelectSchema.optional(),
  include: AppCategoryIncludeSchema.optional(),
  where: AppCategoryWhereUniqueInputSchema,
  create: z.union([ AppCategoryCreateInputSchema,AppCategoryUncheckedCreateInputSchema ]),
  update: z.union([ AppCategoryUpdateInputSchema,AppCategoryUncheckedUpdateInputSchema ]),
}).strict()

export const AppCategoryCreateManyArgsSchema: z.ZodType<Prisma.AppCategoryCreateManyArgs> = z.object({
  data: z.union([ AppCategoryCreateManyInputSchema,AppCategoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const AppCategoryDeleteArgsSchema: z.ZodType<Prisma.AppCategoryDeleteArgs> = z.object({
  select: AppCategorySelectSchema.optional(),
  include: AppCategoryIncludeSchema.optional(),
  where: AppCategoryWhereUniqueInputSchema,
}).strict()

export const AppCategoryUpdateArgsSchema: z.ZodType<Prisma.AppCategoryUpdateArgs> = z.object({
  select: AppCategorySelectSchema.optional(),
  include: AppCategoryIncludeSchema.optional(),
  data: z.union([ AppCategoryUpdateInputSchema,AppCategoryUncheckedUpdateInputSchema ]),
  where: AppCategoryWhereUniqueInputSchema,
}).strict()

export const AppCategoryUpdateManyArgsSchema: z.ZodType<Prisma.AppCategoryUpdateManyArgs> = z.object({
  data: z.union([ AppCategoryUpdateManyMutationInputSchema,AppCategoryUncheckedUpdateManyInputSchema ]),
  where: AppCategoryWhereInputSchema.optional(),
}).strict()

export const AppCategoryDeleteManyArgsSchema: z.ZodType<Prisma.AppCategoryDeleteManyArgs> = z.object({
  where: AppCategoryWhereInputSchema.optional(),
}).strict()

export const AppCommentCreateArgsSchema: z.ZodType<Prisma.AppCommentCreateArgs> = z.object({
  select: AppCommentSelectSchema.optional(),
  include: AppCommentIncludeSchema.optional(),
  data: z.union([ AppCommentCreateInputSchema,AppCommentUncheckedCreateInputSchema ]),
}).strict()

export const AppCommentUpsertArgsSchema: z.ZodType<Prisma.AppCommentUpsertArgs> = z.object({
  select: AppCommentSelectSchema.optional(),
  include: AppCommentIncludeSchema.optional(),
  where: AppCommentWhereUniqueInputSchema,
  create: z.union([ AppCommentCreateInputSchema,AppCommentUncheckedCreateInputSchema ]),
  update: z.union([ AppCommentUpdateInputSchema,AppCommentUncheckedUpdateInputSchema ]),
}).strict()

export const AppCommentCreateManyArgsSchema: z.ZodType<Prisma.AppCommentCreateManyArgs> = z.object({
  data: z.union([ AppCommentCreateManyInputSchema,AppCommentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const AppCommentDeleteArgsSchema: z.ZodType<Prisma.AppCommentDeleteArgs> = z.object({
  select: AppCommentSelectSchema.optional(),
  include: AppCommentIncludeSchema.optional(),
  where: AppCommentWhereUniqueInputSchema,
}).strict()

export const AppCommentUpdateArgsSchema: z.ZodType<Prisma.AppCommentUpdateArgs> = z.object({
  select: AppCommentSelectSchema.optional(),
  include: AppCommentIncludeSchema.optional(),
  data: z.union([ AppCommentUpdateInputSchema,AppCommentUncheckedUpdateInputSchema ]),
  where: AppCommentWhereUniqueInputSchema,
}).strict()

export const AppCommentUpdateManyArgsSchema: z.ZodType<Prisma.AppCommentUpdateManyArgs> = z.object({
  data: z.union([ AppCommentUpdateManyMutationInputSchema,AppCommentUncheckedUpdateManyInputSchema ]),
  where: AppCommentWhereInputSchema.optional(),
}).strict()

export const AppCommentDeleteManyArgsSchema: z.ZodType<Prisma.AppCommentDeleteManyArgs> = z.object({
  where: AppCommentWhereInputSchema.optional(),
}).strict()

export const AppStateCreateArgsSchema: z.ZodType<Prisma.AppStateCreateArgs> = z.object({
  select: AppStateSelectSchema.optional(),
  include: AppStateIncludeSchema.optional(),
  data: z.union([ AppStateCreateInputSchema,AppStateUncheckedCreateInputSchema ]),
}).strict()

export const AppStateUpsertArgsSchema: z.ZodType<Prisma.AppStateUpsertArgs> = z.object({
  select: AppStateSelectSchema.optional(),
  include: AppStateIncludeSchema.optional(),
  where: AppStateWhereUniqueInputSchema,
  create: z.union([ AppStateCreateInputSchema,AppStateUncheckedCreateInputSchema ]),
  update: z.union([ AppStateUpdateInputSchema,AppStateUncheckedUpdateInputSchema ]),
}).strict()

export const AppStateCreateManyArgsSchema: z.ZodType<Prisma.AppStateCreateManyArgs> = z.object({
  data: z.union([ AppStateCreateManyInputSchema,AppStateCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const AppStateDeleteArgsSchema: z.ZodType<Prisma.AppStateDeleteArgs> = z.object({
  select: AppStateSelectSchema.optional(),
  include: AppStateIncludeSchema.optional(),
  where: AppStateWhereUniqueInputSchema,
}).strict()

export const AppStateUpdateArgsSchema: z.ZodType<Prisma.AppStateUpdateArgs> = z.object({
  select: AppStateSelectSchema.optional(),
  include: AppStateIncludeSchema.optional(),
  data: z.union([ AppStateUpdateInputSchema,AppStateUncheckedUpdateInputSchema ]),
  where: AppStateWhereUniqueInputSchema,
}).strict()

export const AppStateUpdateManyArgsSchema: z.ZodType<Prisma.AppStateUpdateManyArgs> = z.object({
  data: z.union([ AppStateUpdateManyMutationInputSchema,AppStateUncheckedUpdateManyInputSchema ]),
  where: AppStateWhereInputSchema.optional(),
}).strict()

export const AppStateDeleteManyArgsSchema: z.ZodType<Prisma.AppStateDeleteManyArgs> = z.object({
  where: AppStateWhereInputSchema.optional(),
}).strict()

export const AppTagCreateArgsSchema: z.ZodType<Prisma.AppTagCreateArgs> = z.object({
  select: AppTagSelectSchema.optional(),
  include: AppTagIncludeSchema.optional(),
  data: z.union([ AppTagCreateInputSchema,AppTagUncheckedCreateInputSchema ]),
}).strict()

export const AppTagUpsertArgsSchema: z.ZodType<Prisma.AppTagUpsertArgs> = z.object({
  select: AppTagSelectSchema.optional(),
  include: AppTagIncludeSchema.optional(),
  where: AppTagWhereUniqueInputSchema,
  create: z.union([ AppTagCreateInputSchema,AppTagUncheckedCreateInputSchema ]),
  update: z.union([ AppTagUpdateInputSchema,AppTagUncheckedUpdateInputSchema ]),
}).strict()

export const AppTagCreateManyArgsSchema: z.ZodType<Prisma.AppTagCreateManyArgs> = z.object({
  data: z.union([ AppTagCreateManyInputSchema,AppTagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const AppTagDeleteArgsSchema: z.ZodType<Prisma.AppTagDeleteArgs> = z.object({
  select: AppTagSelectSchema.optional(),
  include: AppTagIncludeSchema.optional(),
  where: AppTagWhereUniqueInputSchema,
}).strict()

export const AppTagUpdateArgsSchema: z.ZodType<Prisma.AppTagUpdateArgs> = z.object({
  select: AppTagSelectSchema.optional(),
  include: AppTagIncludeSchema.optional(),
  data: z.union([ AppTagUpdateInputSchema,AppTagUncheckedUpdateInputSchema ]),
  where: AppTagWhereUniqueInputSchema,
}).strict()

export const AppTagUpdateManyArgsSchema: z.ZodType<Prisma.AppTagUpdateManyArgs> = z.object({
  data: z.union([ AppTagUpdateManyMutationInputSchema,AppTagUncheckedUpdateManyInputSchema ]),
  where: AppTagWhereInputSchema.optional(),
}).strict()

export const AppTagDeleteManyArgsSchema: z.ZodType<Prisma.AppTagDeleteManyArgs> = z.object({
  where: AppTagWhereInputSchema.optional(),
}).strict()

export const ChatMessageCreateArgsSchema: z.ZodType<Prisma.ChatMessageCreateArgs> = z.object({
  select: ChatMessageSelectSchema.optional(),
  include: ChatMessageIncludeSchema.optional(),
  data: z.union([ ChatMessageCreateInputSchema,ChatMessageUncheckedCreateInputSchema ]),
}).strict()

export const ChatMessageUpsertArgsSchema: z.ZodType<Prisma.ChatMessageUpsertArgs> = z.object({
  select: ChatMessageSelectSchema.optional(),
  include: ChatMessageIncludeSchema.optional(),
  where: ChatMessageWhereUniqueInputSchema,
  create: z.union([ ChatMessageCreateInputSchema,ChatMessageUncheckedCreateInputSchema ]),
  update: z.union([ ChatMessageUpdateInputSchema,ChatMessageUncheckedUpdateInputSchema ]),
}).strict()

export const ChatMessageCreateManyArgsSchema: z.ZodType<Prisma.ChatMessageCreateManyArgs> = z.object({
  data: z.union([ ChatMessageCreateManyInputSchema,ChatMessageCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ChatMessageDeleteArgsSchema: z.ZodType<Prisma.ChatMessageDeleteArgs> = z.object({
  select: ChatMessageSelectSchema.optional(),
  include: ChatMessageIncludeSchema.optional(),
  where: ChatMessageWhereUniqueInputSchema,
}).strict()

export const ChatMessageUpdateArgsSchema: z.ZodType<Prisma.ChatMessageUpdateArgs> = z.object({
  select: ChatMessageSelectSchema.optional(),
  include: ChatMessageIncludeSchema.optional(),
  data: z.union([ ChatMessageUpdateInputSchema,ChatMessageUncheckedUpdateInputSchema ]),
  where: ChatMessageWhereUniqueInputSchema,
}).strict()

export const ChatMessageUpdateManyArgsSchema: z.ZodType<Prisma.ChatMessageUpdateManyArgs> = z.object({
  data: z.union([ ChatMessageUpdateManyMutationInputSchema,ChatMessageUncheckedUpdateManyInputSchema ]),
  where: ChatMessageWhereInputSchema.optional(),
}).strict()

export const ChatMessageDeleteManyArgsSchema: z.ZodType<Prisma.ChatMessageDeleteManyArgs> = z.object({
  where: ChatMessageWhereInputSchema.optional(),
}).strict()

export const ChatMessageActionCreateArgsSchema: z.ZodType<Prisma.ChatMessageActionCreateArgs> = z.object({
  select: ChatMessageActionSelectSchema.optional(),
  include: ChatMessageActionIncludeSchema.optional(),
  data: z.union([ ChatMessageActionCreateInputSchema,ChatMessageActionUncheckedCreateInputSchema ]),
}).strict()

export const ChatMessageActionUpsertArgsSchema: z.ZodType<Prisma.ChatMessageActionUpsertArgs> = z.object({
  select: ChatMessageActionSelectSchema.optional(),
  include: ChatMessageActionIncludeSchema.optional(),
  where: ChatMessageActionWhereUniqueInputSchema,
  create: z.union([ ChatMessageActionCreateInputSchema,ChatMessageActionUncheckedCreateInputSchema ]),
  update: z.union([ ChatMessageActionUpdateInputSchema,ChatMessageActionUncheckedUpdateInputSchema ]),
}).strict()

export const ChatMessageActionCreateManyArgsSchema: z.ZodType<Prisma.ChatMessageActionCreateManyArgs> = z.object({
  data: z.union([ ChatMessageActionCreateManyInputSchema,ChatMessageActionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ChatMessageActionDeleteArgsSchema: z.ZodType<Prisma.ChatMessageActionDeleteArgs> = z.object({
  select: ChatMessageActionSelectSchema.optional(),
  include: ChatMessageActionIncludeSchema.optional(),
  where: ChatMessageActionWhereUniqueInputSchema,
}).strict()

export const ChatMessageActionUpdateArgsSchema: z.ZodType<Prisma.ChatMessageActionUpdateArgs> = z.object({
  select: ChatMessageActionSelectSchema.optional(),
  include: ChatMessageActionIncludeSchema.optional(),
  data: z.union([ ChatMessageActionUpdateInputSchema,ChatMessageActionUncheckedUpdateInputSchema ]),
  where: ChatMessageActionWhereUniqueInputSchema,
}).strict()

export const ChatMessageActionUpdateManyArgsSchema: z.ZodType<Prisma.ChatMessageActionUpdateManyArgs> = z.object({
  data: z.union([ ChatMessageActionUpdateManyMutationInputSchema,ChatMessageActionUncheckedUpdateManyInputSchema ]),
  where: ChatMessageActionWhereInputSchema.optional(),
}).strict()

export const ChatMessageActionDeleteManyArgsSchema: z.ZodType<Prisma.ChatMessageActionDeleteManyArgs> = z.object({
  where: ChatMessageActionWhereInputSchema.optional(),
}).strict()

export const ConversationCreateArgsSchema: z.ZodType<Prisma.ConversationCreateArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  data: z.union([ ConversationCreateInputSchema,ConversationUncheckedCreateInputSchema ]),
}).strict()

export const ConversationUpsertArgsSchema: z.ZodType<Prisma.ConversationUpsertArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  where: ConversationWhereUniqueInputSchema,
  create: z.union([ ConversationCreateInputSchema,ConversationUncheckedCreateInputSchema ]),
  update: z.union([ ConversationUpdateInputSchema,ConversationUncheckedUpdateInputSchema ]),
}).strict()

export const ConversationCreateManyArgsSchema: z.ZodType<Prisma.ConversationCreateManyArgs> = z.object({
  data: z.union([ ConversationCreateManyInputSchema,ConversationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ConversationDeleteArgsSchema: z.ZodType<Prisma.ConversationDeleteArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  where: ConversationWhereUniqueInputSchema,
}).strict()

export const ConversationUpdateArgsSchema: z.ZodType<Prisma.ConversationUpdateArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  data: z.union([ ConversationUpdateInputSchema,ConversationUncheckedUpdateInputSchema ]),
  where: ConversationWhereUniqueInputSchema,
}).strict()

export const ConversationUpdateManyArgsSchema: z.ZodType<Prisma.ConversationUpdateManyArgs> = z.object({
  data: z.union([ ConversationUpdateManyMutationInputSchema,ConversationUncheckedUpdateManyInputSchema ]),
  where: ConversationWhereInputSchema.optional(),
}).strict()

export const ConversationDeleteManyArgsSchema: z.ZodType<Prisma.ConversationDeleteManyArgs> = z.object({
  where: ConversationWhereInputSchema.optional(),
}).strict()

export const FollowRelationCreateArgsSchema: z.ZodType<Prisma.FollowRelationCreateArgs> = z.object({
  select: FollowRelationSelectSchema.optional(),
  include: FollowRelationIncludeSchema.optional(),
  data: z.union([ FollowRelationCreateInputSchema,FollowRelationUncheckedCreateInputSchema ]),
}).strict()

export const FollowRelationUpsertArgsSchema: z.ZodType<Prisma.FollowRelationUpsertArgs> = z.object({
  select: FollowRelationSelectSchema.optional(),
  include: FollowRelationIncludeSchema.optional(),
  where: FollowRelationWhereUniqueInputSchema,
  create: z.union([ FollowRelationCreateInputSchema,FollowRelationUncheckedCreateInputSchema ]),
  update: z.union([ FollowRelationUpdateInputSchema,FollowRelationUncheckedUpdateInputSchema ]),
}).strict()

export const FollowRelationCreateManyArgsSchema: z.ZodType<Prisma.FollowRelationCreateManyArgs> = z.object({
  data: z.union([ FollowRelationCreateManyInputSchema,FollowRelationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const FollowRelationDeleteArgsSchema: z.ZodType<Prisma.FollowRelationDeleteArgs> = z.object({
  select: FollowRelationSelectSchema.optional(),
  include: FollowRelationIncludeSchema.optional(),
  where: FollowRelationWhereUniqueInputSchema,
}).strict()

export const FollowRelationUpdateArgsSchema: z.ZodType<Prisma.FollowRelationUpdateArgs> = z.object({
  select: FollowRelationSelectSchema.optional(),
  include: FollowRelationIncludeSchema.optional(),
  data: z.union([ FollowRelationUpdateInputSchema,FollowRelationUncheckedUpdateInputSchema ]),
  where: FollowRelationWhereUniqueInputSchema,
}).strict()

export const FollowRelationUpdateManyArgsSchema: z.ZodType<Prisma.FollowRelationUpdateManyArgs> = z.object({
  data: z.union([ FollowRelationUpdateManyMutationInputSchema,FollowRelationUncheckedUpdateManyInputSchema ]),
  where: FollowRelationWhereInputSchema.optional(),
}).strict()

export const FollowRelationDeleteManyArgsSchema: z.ZodType<Prisma.FollowRelationDeleteManyArgs> = z.object({
  where: FollowRelationWhereInputSchema.optional(),
}).strict()

export const InvitationRelationCreateArgsSchema: z.ZodType<Prisma.InvitationRelationCreateArgs> = z.object({
  select: InvitationRelationSelectSchema.optional(),
  include: InvitationRelationIncludeSchema.optional(),
  data: z.union([ InvitationRelationCreateInputSchema,InvitationRelationUncheckedCreateInputSchema ]),
}).strict()

export const InvitationRelationUpsertArgsSchema: z.ZodType<Prisma.InvitationRelationUpsertArgs> = z.object({
  select: InvitationRelationSelectSchema.optional(),
  include: InvitationRelationIncludeSchema.optional(),
  where: InvitationRelationWhereUniqueInputSchema,
  create: z.union([ InvitationRelationCreateInputSchema,InvitationRelationUncheckedCreateInputSchema ]),
  update: z.union([ InvitationRelationUpdateInputSchema,InvitationRelationUncheckedUpdateInputSchema ]),
}).strict()

export const InvitationRelationCreateManyArgsSchema: z.ZodType<Prisma.InvitationRelationCreateManyArgs> = z.object({
  data: z.union([ InvitationRelationCreateManyInputSchema,InvitationRelationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const InvitationRelationDeleteArgsSchema: z.ZodType<Prisma.InvitationRelationDeleteArgs> = z.object({
  select: InvitationRelationSelectSchema.optional(),
  include: InvitationRelationIncludeSchema.optional(),
  where: InvitationRelationWhereUniqueInputSchema,
}).strict()

export const InvitationRelationUpdateArgsSchema: z.ZodType<Prisma.InvitationRelationUpdateArgs> = z.object({
  select: InvitationRelationSelectSchema.optional(),
  include: InvitationRelationIncludeSchema.optional(),
  data: z.union([ InvitationRelationUpdateInputSchema,InvitationRelationUncheckedUpdateInputSchema ]),
  where: InvitationRelationWhereUniqueInputSchema,
}).strict()

export const InvitationRelationUpdateManyArgsSchema: z.ZodType<Prisma.InvitationRelationUpdateManyArgs> = z.object({
  data: z.union([ InvitationRelationUpdateManyMutationInputSchema,InvitationRelationUncheckedUpdateManyInputSchema ]),
  where: InvitationRelationWhereInputSchema.optional(),
}).strict()

export const InvitationRelationDeleteManyArgsSchema: z.ZodType<Prisma.InvitationRelationDeleteManyArgs> = z.object({
  where: InvitationRelationWhereInputSchema.optional(),
}).strict()

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict()

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict()

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
}).strict()

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
}).strict()

export const StarringAppCreateArgsSchema: z.ZodType<Prisma.StarringAppCreateArgs> = z.object({
  select: StarringAppSelectSchema.optional(),
  include: StarringAppIncludeSchema.optional(),
  data: z.union([ StarringAppCreateInputSchema,StarringAppUncheckedCreateInputSchema ]),
}).strict()

export const StarringAppUpsertArgsSchema: z.ZodType<Prisma.StarringAppUpsertArgs> = z.object({
  select: StarringAppSelectSchema.optional(),
  include: StarringAppIncludeSchema.optional(),
  where: StarringAppWhereUniqueInputSchema,
  create: z.union([ StarringAppCreateInputSchema,StarringAppUncheckedCreateInputSchema ]),
  update: z.union([ StarringAppUpdateInputSchema,StarringAppUncheckedUpdateInputSchema ]),
}).strict()

export const StarringAppCreateManyArgsSchema: z.ZodType<Prisma.StarringAppCreateManyArgs> = z.object({
  data: z.union([ StarringAppCreateManyInputSchema,StarringAppCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const StarringAppDeleteArgsSchema: z.ZodType<Prisma.StarringAppDeleteArgs> = z.object({
  select: StarringAppSelectSchema.optional(),
  include: StarringAppIncludeSchema.optional(),
  where: StarringAppWhereUniqueInputSchema,
}).strict()

export const StarringAppUpdateArgsSchema: z.ZodType<Prisma.StarringAppUpdateArgs> = z.object({
  select: StarringAppSelectSchema.optional(),
  include: StarringAppIncludeSchema.optional(),
  data: z.union([ StarringAppUpdateInputSchema,StarringAppUncheckedUpdateInputSchema ]),
  where: StarringAppWhereUniqueInputSchema,
}).strict()

export const StarringAppUpdateManyArgsSchema: z.ZodType<Prisma.StarringAppUpdateManyArgs> = z.object({
  data: z.union([ StarringAppUpdateManyMutationInputSchema,StarringAppUncheckedUpdateManyInputSchema ]),
  where: StarringAppWhereInputSchema.optional(),
}).strict()

export const StarringAppDeleteManyArgsSchema: z.ZodType<Prisma.StarringAppDeleteManyArgs> = z.object({
  where: StarringAppWhereInputSchema.optional(),
}).strict()

export const TranscationCreateArgsSchema: z.ZodType<Prisma.TranscationCreateArgs> = z.object({
  select: TranscationSelectSchema.optional(),
  include: TranscationIncludeSchema.optional(),
  data: z.union([ TranscationCreateInputSchema,TranscationUncheckedCreateInputSchema ]),
}).strict()

export const TranscationUpsertArgsSchema: z.ZodType<Prisma.TranscationUpsertArgs> = z.object({
  select: TranscationSelectSchema.optional(),
  include: TranscationIncludeSchema.optional(),
  where: TranscationWhereUniqueInputSchema,
  create: z.union([ TranscationCreateInputSchema,TranscationUncheckedCreateInputSchema ]),
  update: z.union([ TranscationUpdateInputSchema,TranscationUncheckedUpdateInputSchema ]),
}).strict()

export const TranscationCreateManyArgsSchema: z.ZodType<Prisma.TranscationCreateManyArgs> = z.object({
  data: z.union([ TranscationCreateManyInputSchema,TranscationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const TranscationDeleteArgsSchema: z.ZodType<Prisma.TranscationDeleteArgs> = z.object({
  select: TranscationSelectSchema.optional(),
  include: TranscationIncludeSchema.optional(),
  where: TranscationWhereUniqueInputSchema,
}).strict()

export const TranscationUpdateArgsSchema: z.ZodType<Prisma.TranscationUpdateArgs> = z.object({
  select: TranscationSelectSchema.optional(),
  include: TranscationIncludeSchema.optional(),
  data: z.union([ TranscationUpdateInputSchema,TranscationUncheckedUpdateInputSchema ]),
  where: TranscationWhereUniqueInputSchema,
}).strict()

export const TranscationUpdateManyArgsSchema: z.ZodType<Prisma.TranscationUpdateManyArgs> = z.object({
  data: z.union([ TranscationUpdateManyMutationInputSchema,TranscationUncheckedUpdateManyInputSchema ]),
  where: TranscationWhereInputSchema.optional(),
}).strict()

export const TranscationDeleteManyArgsSchema: z.ZodType<Prisma.TranscationDeleteManyArgs> = z.object({
  where: TranscationWhereInputSchema.optional(),
}).strict()

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict()

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict()

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict()

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict()

export const VerificationTokenCreateArgsSchema: z.ZodType<Prisma.VerificationTokenCreateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
}).strict()

export const VerificationTokenUpsertArgsSchema: z.ZodType<Prisma.VerificationTokenUpsertArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
  create: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
  update: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
}).strict()

export const VerificationTokenCreateManyArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyArgs> = z.object({
  data: z.union([ VerificationTokenCreateManyInputSchema,VerificationTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const VerificationTokenDeleteArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const VerificationTokenUpdateArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const VerificationTokenUpdateManyArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyArgs> = z.object({
  data: z.union([ VerificationTokenUpdateManyMutationInputSchema,VerificationTokenUncheckedUpdateManyInputSchema ]),
  where: VerificationTokenWhereInputSchema.optional(),
}).strict()

export const VerificationTokenDeleteManyArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteManyArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
}).strict()