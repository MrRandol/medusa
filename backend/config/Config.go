package config

type Config struct {
	Server   ServerConfig   `yaml:"server"`
	Database DatabaseConfig `yaml:"database"`
}

type ServerConfig struct {
	Port string `yaml:"port" envconfig:"SERVER_PORT"`
}

type DatabaseConfig struct {
	User     string `yaml:"user" envconfig:"DATABASE_PORT"`
	Password string `yaml:"password" envconfig:"DATABASE_PASSWORD"`
	Name     string `yaml:"name" envconfig:"DATABASE_NAME"`
	Host     string `yaml:"host" envconfig:"DATABASE_HOST"`
	Port     string `yaml:"port" envconfig:"DATABASE_PORT"`
	Tz       string `yaml:"tz" envconfig:"DATABASE_TZ"`
}
