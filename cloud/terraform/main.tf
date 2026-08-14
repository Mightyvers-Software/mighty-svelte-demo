resource "azurerm_resource_group" "main" {
  name     = var.resource_group_name
  location = var.location
}


resource "azurerm_container_registry" "main" {
  name                = var.acr_name
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location

  sku = "Basic"

  admin_enabled = true
}


resource "azurerm_service_plan" "main" {
  name                = var.app_service_plan_name
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location

  os_type = "Linux"
  sku_name = "B1"
}


resource "azurerm_linux_web_app" "main" {
  name                = var.web_app_name
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_service_plan.main.location

  service_plan_id = azurerm_service_plan.main.id

  site_config {
    always_on = false

    application_stack {
      docker_image_name = "mighty-todo:latest"
    }
  }
}