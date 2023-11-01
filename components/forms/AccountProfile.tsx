
"use client";

import { ChangeEvent, useState } from "react";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

//import { updateUser } from "@/lib/actions/user.actions";

import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

//import { useUploadThing } from "@/lib/uploadthing";

//import { isBase64Image } from "@/lib/utils";

import { accountProfileValidation } from "@/lib/validations/accountProfile";

interface Props {
  user: IUser | null;
  buttonTitle: string;
}

const AccountProfile = ({ user, buttonTitle }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  //const { startUpload } = useUploadThing("imageUploader");

  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<z.infer<typeof accountProfileValidation>>({
    resolver: zodResolver(accountProfileValidation),
    defaultValues: {
      profile: user?.images?.profile || "",
      firstName: user?.firstName || "Cabdirisaaq",
      middleName: user?.middleName || "Cawil",
      lastName: user?.lastName || "Faarax",
      email: user?.email || "Abdurazak.awil1@gmail.com",
      birthdate: user?.birthdate || "2023-08-25",
      gender: user?.gender || "male",
    },
  });

  const onSubmit = async (values: z.infer<typeof accountProfileValidation>) => {
    console.log(values);
    /*const blob = values.profile_photo;

    const hasImageChanged = isBase64Image(blob);
    
    if (hasImageChanged) {
      
      const imgRes = await startUpload(files);
      
      if (imgRes && imgRes[0].fileUrl) {
        values.profile_photo = imgRes[0].fileUrl;
      }
    }
    await updateUser({
      name: values.name,
      path: pathname,
      username: values.username,
      userId: user.id,
      bio: values.bio,
      image: values.profile_photo,
    });

    if (pathname === "/profile/edit") {
      router.back();
    } else {
      router.push("/");
    }*/
  };

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void,
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files?.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  return (
    <Form {...form}>
      <form
        className="relative flex flex-col justify-start gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="profile"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="account-form_image-label ng-slate-300">
                <div className="relative flex items-center justify-center w-24 h-24 rounded-full">
                  {field?.value?.length > 0 ? (
                    <Image
                      src={field.value}
                      alt="profile photo"
                      fill
                      priority
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <Image
                      src="/assets/profile.svg"
                      alt="profile"
                      width={50}
                      height={50}
                      className="object-contain rounded-full"
                    />
                  )}
                </div>
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Add profile photo"
                  className="max-lg:hidden account-form_image-input no-focus"
                  onChange={(e) => handleImageChange(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex">
                First Name <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Eg: Cabdirisaaq" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="middleName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex ">Middle Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Eg: Cawil"
                  className="form-input"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex">
                Last Name <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Eg: Faarax" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex">
                Email <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Eg: myemail@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-2">
              <FormLabel className="text-base-semibold text-light-3">
                Bio
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={7}
                  className="bg-slate-800 border border-slate-700 no-focus"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="birthdate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex">
                Date of Birth <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input type="date" className="form-input-date" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="text-slate-50 flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="male" />
                    </FormControl>
                    <FormLabel className="font-normal">Male</FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="female" />
                    </FormControl>
                    <FormLabel className="font-normal">Female</FormLabel>
                  </FormItem>
                  {/*}
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="none" />
                    </FormControl>
                    <FormLabel className="font-normal">Nothing</FormLabel>
                  </FormItem>*/}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/*}<FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex">
                Gender <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <div className="my-4 flex flex-col gap-3">
          
          <div className="flex items-center gap-2">
            <Input
              id="male"
              type="radio"
              name="gender"
              value={field.value}
              {...field}
              onChange={() => field.onChange("male")}
              className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 focus:ring-blue-500"
            />
            <label
              htmlFor="male"
              className="text-sm text-slate-100 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Male
            </label>
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="radio"
              id="female"
              name="gender"
              value={field.value}
              
              onChange={() => field.onChange("female")}
              {...field}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="female"
              className="text-sm text-slate-100 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Female
            </label>
          </div>
        </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />*/}

        <Button
          type="submit"
          className="form-btn"
          disabled={form?.formState?.isSubmitting}
        >
          {form?.formState?.isSubmitting ? "Submitting..." : buttonTitle}
        </Button>
      </form>
    </Form>
  );
};

export default AccountProfile;

/*
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  type: z.enum(["all", "mentions", "none"], {
    required_error: "You need to select a notification type.",
  }),
})

export function RadioGroupForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Notify me about...</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="all" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      All new messages
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="mentions" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Direct messages and mentions
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="none" />
                    </FormControl>
                    <FormLabel className="font-normal">Nothing</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

*/
