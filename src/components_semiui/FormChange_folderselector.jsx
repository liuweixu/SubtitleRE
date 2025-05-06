import { useFormApi, Button } from "@douyinfe/semi-ui";
import FolderSelector from "@/common/FolderSelector";
import { IconUpload } from "@douyinfe/semi-icons-lab";

/**
1. 传入的参数中，要学习Props，必须只能传入一个对象
2. 下面的useFormApi属于Hook的使用，具体见官方文档
3. change中，必须改为异步，因为FolderSelector是异步，所以下面程序也要加上await等。
4. 加上async时候，一般在await外面的一层，即下面的change中。
 */
const FormChange = ({ field_name, setInput }) => {
  const formApi = useFormApi();
  const change = async () => {
    const filePath = await FolderSelector();
    formApi.setValue(field_name, filePath);
    setInput(filePath);
  };
  return (
    <Button onClick={change} icon={<IconUpload />}>
      选择目录
    </Button>
  );
};

export default FormChange;
