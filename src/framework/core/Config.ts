import * as mongoose from 'mongoose';

export interface AppConfig{
	locale: string;
	fallbackLocale: string;
	environment: string;
	appName: string;
	organization: string;
	baseUrl: string;
}

export interface MongooseConfig{
	uri: string;
	options?: mongoose.MongosOptions;
}

export interface DBConfig{
	host: string;
	port: number;
	username: string;
	password: string;
	database: string;
}

export interface PathsConfig{
	publicPath:string;
	assetsPath:string;
	resourcesPath:string;
	viewsPath:string;
	i18nPath:string;
	storagePath:string;
	downloadsPath:string;
	sessionsPath:string;
	cachePath:string;
	appPath: string;
}

export interface FileSystemConfig{
	paths: PathsConfig;
	
}

export interface EnvironmentConfigOptions{
	app: AppConfig;
	database: DatabaseConfig;
}

export interface EnvironmentConfig{
	[key: string]: EnvironmentConfigOptions;
}

export interface MySQLConfig extends DBConfig{

}

export interface MongoDBConfig extends DBConfig{
	
}

export interface RethinkDBConfig extends DBConfig{
	
}

export interface FirebaseConfig extends DBConfig{
	host: string;
	username: string;
	password: string;
}

export interface DatabaseConfig{
	mysql?: MySQLConfig;
	mongodb?: MongoDBConfig;
	rethinkdb?: RethinkDBConfig;
	firebase?:FirebaseConfig;
}