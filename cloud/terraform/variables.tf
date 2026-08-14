variable "location" {
  default = "australiaeast"
}

variable "resource_group_name" {
  default = "mighty-todo-rg"
}

variable "acr_name" {
  default = "mightytodoacr"
}

variable "app_service_plan_name" {
  default = "mighty-todo-plan"
}

variable "web_app_name" {
  default = "mighty-todo-app"
}

variable "subscription_id" {
  type = string
}

variable "tenant_id" {
  type = string
}

variable "client_id" {
  type = string
}