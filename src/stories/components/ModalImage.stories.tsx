import ModalImage from "@/components/custom/ModalImage";
import { Meta, StoryFn } from "@storybook/nextjs";

export default {
  title: "Components/ModalImage",
  component: ModalImage,
  tags: ["autodocs"],
} as Meta<typeof ModalImage>;

const Template: StoryFn<typeof ModalImage> = () => <ModalImage images={[]} initialIndex={0} onClose={function(): void {
  console.log(`Callback from func`);
} } />;

export const Default = Template.bind({});
Default.args = {};
