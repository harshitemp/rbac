import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavabarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-user-management',
  standalone:true,
  imports:[FormsModule,CommonModule,NavabarComponent],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {
  searchTerm: string = '';
  sortCriteria: string = 'name';  // Default sorting by name
  sortAscending: boolean = true;  // Default sort order is ascending
  showUserForm: boolean = false;
  editingUser: boolean = false;
  currentUser: any = {};
  users: any[] = [
    { id: 1, name: 'harshi', email: 'harshi@example.com', role: 'Admin', status: true },
    { id: 2, name: 'harshitha', email: 'harshitha@example.com', role: 'User', status: false },
    { id: 3, name: 'Sam', email: 'sam@example.com', role: 'Manager', status: true },
  ];
  filteredUsers: any[] = [...this.users];  // Initially, all users are displayed

  // Method to filter users based on search term
  filterUsers() {
    this.filteredUsers = this.users.filter(user => 
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Method to sort users based on selected criteria
  sortUsers() {
    this.filteredUsers.sort((a, b) => {
      if (a[this.sortCriteria] < b[this.sortCriteria]) {
        return this.sortAscending ? -1 : 1;
      } else if (a[this.sortCriteria] > b[this.sortCriteria]) {
        return this.sortAscending ? 1 : -1;
      }
      return 0;
    });
  }

  // Method to toggle the user status (active/inactive)
  toggleStatus(user: any) {
    user.status = !user.status;
  }

  // Method to open the Add/Edit user form
  openAddUserForm() {
    this.showUserForm = true;
    this.editingUser = false;
    this.currentUser = { id: null, name: '', email: '', role: 'User', status: true };
  }

  // Method to close the Add/Edit user form
  closeUserForm() {
    this.showUserForm = false;
  }

  // Method to edit a user
  editUser(user: any) {
    this.showUserForm = true;
    this.editingUser = true;
    this.currentUser = { ...user };  // Copy the selected user details
  }

  // Method to delete a user
  deleteUser(userId: number) {
    this.users = this.users.filter(user => user.id !== userId);
    this.filterUsers();  // Re-filter users after deletion
  }

  // Method to save or update user details
  saveUser() {
    if (this.editingUser) {
      // Update the user
      const index = this.users.findIndex(user => user.id === this.currentUser.id);
      if (index !== -1) {
        this.users[index] = { ...this.currentUser };
      }
    } else {
      // Add a new user
      this.currentUser.id = this.users.length + 1;  // Generate a new ID
      this.users.push({ ...this.currentUser });
    }

    this.filterUsers();  // Re-filter users after adding/updating
    this.closeUserForm();  // Close the form
  }
}
