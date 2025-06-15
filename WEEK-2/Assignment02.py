'''Create a Python program that implements a singly linked list using Object-Oriented Programming (OOP) principles. 
Your implementation should include the following: A Node class to represent each node in the list. 
A LinkedList class to manage the nodes, with methods to: Add a node to the end of the list 
Print the list Delete the nth node (where n is a 1-based index) Include exception handling to manage edge cases such as:
Deleting a node from an empty list 
Deleting a node with an index out of range 
Test your implementation with at least one sample list.'''

# Name: Shubham
# Student Id: CT_CSI_DS_4356

class Node: #Representing a node in the singly linked list
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList: #Manages the singly linked list
    def __init__(self):
        self.head = None

    def add_node(self, data): #Adds a node with the given data to the end of the list
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node # Adding the new node at the end of the list
        print(f"Added node with value {data} to the list.")
        return

    def print_list(self): 
        
        current = self.head
        if not current:
            print("List is empty.")
            return
        while current:
            print(current.data, end=" -> " if current.next else "\n")
            current = current.next #Moving to the next node

    def delete_nth_node(self, n): #Deletes the nth node (1-based index) from the list.
        
        if not self.head:
            raise Exception("Cannot delete from an empty list.")
        if n <= 0:
            raise Exception("Index must be a positive integer.")

        # Deleting the head node
        if n == 1:
            print(f"Deleting node at position {n} with value {self.head.data}")
            self.head = self.head.next
            return

        current = self.head
        prev = None
        count = 1

        while current and count < n:
            prev = current
            current = current.next
            count += 1

        if not current:
            raise Exception("Indexed out of the given range.")

        print(f"Deleting node at position {n} with value {current.data}")
        prev.next = current.next

#************** Testing the implementation process for the given classes **************

if __name__ == "__main__":
    ll = LinkedList()
    # Adding nodes to the list
    for value in [10, 20, 30, 40, 50,60]:
        ll.add_node(value)

    print("Initial list:")
    ll.print_list()

    # Deleting the 3rd node
    try:
        ll.delete_nth_node(3)
        print("List after deleting 3rd node:")
        ll.print_list()
    except Exception as e:
        print("Error:", e)

    # Deleting the head node
    try:
        ll.delete_nth_node(1)
        print("List after deleting head node:")
        ll.print_list()
    except Exception as e:
        print("Error:", e)

    # Deleting with index out of range
    try:
        ll.delete_nth_node(10)
    except Exception as e:
        print("Error:", e)

    # Deleting from an empty list
    empty_ll = LinkedList() # Creating an empty linked list
    try:
        empty_ll.delete_nth_node(1)
    except Exception as e:
        print("Error:", e)
