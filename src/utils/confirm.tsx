import Swal from "sweetalert2";

export const confirmDelete = async (
    title = "Are you sure?",
    text = "Data cannot be restored!"
): Promise<boolean> => {
    const result = await Swal.fire({
        title,
        text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#aaa",
        confirmButtonText: "Yes, Delete!",
    });

    return result.isConfirmed;
};
