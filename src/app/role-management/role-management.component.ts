import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavabarComponent } from "../navbar/navbar.component";

interface Role {
  id: number | null;
  name: string;
  permissions: string[];
}

@Component({
  selector: 'app-role-management',
  standalone: true,
  imports: [FormsModule, CommonModule, NavabarComponent],
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css']
})
export class RoleManagementComponent {
  roles: Role[] = [
    { id: 1, name: 'Admin', permissions: ['read', 'write', 'delete'] },
    { id: 2, name: 'User', permissions: ['read'] },
    { id: 3, name: 'Manager', permissions: ['read', 'write'] },
  ];

  filteredRoles: Role[] = [...this.roles]; // Initialize with all roles
  showRoleForm = false;
  editingRole = false;
  currentRole: Role = { id: null, name: '', permissions: [] };
  allPermissions: string[] = ['read', 'write', 'delete', 'create', 'update'];
  customPermission: string = ''; // For adding custom permissions
  sortOrder: boolean = true; // True for ascending, false for descending
  searchTerm: string = ''; // For filtering by name

  openAddRoleForm() {
    this.showRoleForm = true;
    this.editingRole = false;
    this.currentRole = { id: null, name: '', permissions: [] };
    this.customPermission = '';
  }

  openEditRoleForm(role: Role) {
    this.showRoleForm = true;
    this.editingRole = true;
    this.currentRole = { ...role };
    this.customPermission = '';
  }

  saveRole() {
    if (this.editingRole) {
      const index = this.roles.findIndex(role => role.id === this.currentRole.id);
      if (index !== -1) {
        this.roles[index] = this.currentRole;
      }
    } else {
      this.currentRole.id = this.roles.length + 1;
      this.roles.push(this.currentRole);
    }
    this.closeRoleForm();
    this.filterRoles(); // Reapply filter after save
  }

  closeRoleForm() {
    this.showRoleForm = false;
  }

  togglePermission(permission: string) {
    const index = this.currentRole.permissions.indexOf(permission);
    if (index === -1) {
      this.currentRole.permissions.push(permission);
    } else {
      this.currentRole.permissions.splice(index, 1);
    }
  }

  addCustomPermission() {
    if (this.customPermission && !this.currentRole.permissions.includes(this.customPermission)) {
      this.currentRole.permissions.push(this.customPermission);
      this.customPermission = '';
    }
  }

  deleteRole(roleId: number) {
    this.roles = this.roles.filter(role => role.id !== roleId);
    this.filterRoles(); // Reapply filter after deletion
  }

  hasPermission(permission: string): boolean {
    return this.currentRole.permissions.includes(permission);
  }

  filterRoles() {
    this.filteredRoles = this.roles.filter(role =>
      role.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  sortRoles() {
    this.sortOrder = !this.sortOrder;
    this.filteredRoles.sort((a, b) => {
      if (a.name < b.name) return this.sortOrder ? -1 : 1;
      if (a.name > b.name) return this.sortOrder ? 1 : -1;
      return 0;
    });
  }
 
}
