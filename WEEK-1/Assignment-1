# Create lower triangular, upper triangular and pyramid containing the "*" character.
# Name: Shubham
# Student Id: CT_CSI_DS_4356

def lower_triangular(n):
    print("Lower Triangular Pattern:")
    for i in range(1, n+1):
        for j in range(1, i+1):
            print('*', end=' ')
        print()
    print("\n") 


def upper_triangular(n):
    print("Upper Triangular Pattern:")
    for i in range(n, 0, -1):
        for j in range(1, i+1):
            print('*', end=' ')
        print()
    print("\n") 


def pyramid(n):
    print("Pyramid Pattern:")
    for i in range(1, n+1):
        # Print leading spaces
        for j in range(n-i):
            print(' ', end=' ')
        # Print stars
        for k in range(2*i-1):
            print('*', end=' ')
        print()
    print("\n") 


if __name__ == "__main__":
    try:
        rows = int(input("Enter the number of rows: "))
        if rows <= 0:
            print("Please enter a positive integer.")
        else:
            lower_triangular(rows)
            upper_triangular(rows)
            pyramid(rows)
    except ValueError:
        print("Invalid input. Please enter a valid integer.")
