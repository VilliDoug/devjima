interface DeleteButtonProps {
  onDelete: () => void;
  label?: string;
}

export default function DeleteButton({
  onDelete,
  label = "Delete",
}: DeleteButtonProps) {
    
  return (
    <button
      onClick={onDelete}
      className="bg-transparent border-none cursor-pointer text-gray-500 text-xs mt-1 hover:text-pink-400 transition-colors"
    >
      {label}
    </button>
  );
}
