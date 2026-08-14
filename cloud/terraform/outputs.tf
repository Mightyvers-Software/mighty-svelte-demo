output "resource_group_name" {
  value = azurerm_resource_group.main.name
}


output "container_registry_login_server" {
  value = azurerm_container_registry.main.login_server
}


output "web_app_name" {
  value = azurerm_linux_web_app.main.name
}