import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { NavabarComponent } from "../navbar/navbar.component";

// Define a Permissions type that allows any string as a key
interface Permissions {
  [key: string]: boolean;
}

@Component({
  selector: 'app-dynamic-permissions',
  standalone: true,
  imports: [FormsModule, CommonModule, NavabarComponent],
  templateUrl: './dynamic-permissions.component.html',
  styleUrls: ['./dynamic-permissions.component.css']
})
export class DynamicPermissionsComponent {
  roles = [
    { name: 'Admin', permissions: { View: false, Edit: false, Delete: false } as Permissions },
    { name: 'Editor', permissions: { View: false, Edit: false, Delete: false } as Permissions },
    { name: 'Viewer', permissions: { View: false, Edit: false, Delete: false } as Permissions }
  ];

  allPermissions = ['View', 'Edit', 'Delete', 'Create'];
  savedPermissions: { [roleName: string]: Permissions } = {};
  showCustomPermissionModal = false;
  customPermission = '';

  // For sorting and filtering
  filterRole = '';
  sortCriteria: 'name' | 'permissionsCount' = 'name';
  sortAscending = true;

  constructor(private cdr: ChangeDetectorRef) {}

  onPermissionChange(role: any, permission: string) {
    role.permissions[permission] = !role.permissions[permission];
  }

  savePermissions(role: any) {
    this.savedPermissions[role.name] = { ...role.permissions };
    console.log(`Saved permissions for ${role.name}:`, this.savedPermissions[role.name]);
    this.cdr.detectChanges();
  }

  openCustomPermissionModal() {
    this.showCustomPermissionModal = true;
  }

  closeCustomPermissionModal() {
    this.showCustomPermissionModal = false;
  }

  addCustomPermission() {
    if (this.customPermission && !this.allPermissions.includes(this.customPermission)) {
      this.allPermissions.push(this.customPermission);
      this.roles.forEach(role => {
        role.permissions[this.customPermission] = false;
      });
      this.customPermission = '';
    }
    this.closeCustomPermissionModal();
  }

  // Sorting logic
  sortRoles() {
    this.roles.sort((a, b) => {
      if (this.sortCriteria === 'name') {
        return this.sortAscending
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        const aCount = Object.values(a.permissions).filter(Boolean).length;
        const bCount = Object.values(b.permissions).filter(Boolean).length;
        return this.sortAscending ? aCount - bCount : bCount - aCount;
      }
    });
  }

  // Filtering logic
  getFilteredRoles() {
    return this.roles.filter(role =>
      role.name.toLowerCase().includes(this.filterRole.toLowerCase())
    );
  }
}
