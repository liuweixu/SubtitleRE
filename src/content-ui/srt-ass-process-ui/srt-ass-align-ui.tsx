"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { SRTASSAlign } from "@models/srt-ass-process/srt-ass-align";

export function Srt_Ass_Align_UI() {
  const form = useForm();
  const { click } = SRTASSAlign();
  //获取输入框的目录地址
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [output, setOutput] = useState("");
  const [srtsuffix, setSrtsuffix] = useState("");
  const [asssuffix, setAsssuffix] = useState("");
  const [logtext, setLogtext] = useState("");

  return (
    <Form {...form}>
      <form
        className="space-y-8"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <FormField
          control={form.control}
          name="输入信息"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SRT输入目录</FormLabel>
              <FormControl>
                <Input
                  placeholder="请输入SRT字幕所在的目录"
                  {...field}
                  onChange={(e) => setInput1(e.target.value)}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
              <FormLabel>ASS输入目录</FormLabel>
              <FormControl>
                <Input
                  placeholder="请输入ASS字幕（参考）所在的目录"
                  {...field}
                  onChange={(e) => setInput2(e.target.value)}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
              <FormLabel>SRT字幕输出目录</FormLabel>
              <FormControl>
                <Input
                  placeholder="请输入对齐后的SRT字幕的输出目录"
                  {...field}
                  onChange={(e) => setOutput(e.target.value)}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
              <FormLabel>SRT字幕后缀</FormLabel>
              <FormControl>
                <Input
                  placeholder="请输入SRT字幕后缀，例如：.jp.srt"
                  {...field}
                  onChange={(e) => setSrtsuffix(e.target.value)}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
              <FormLabel>ASS字幕后缀</FormLabel>
              <FormControl>
                <Input
                  placeholder="请输入ASS字幕后缀，例如：.sc.ass"
                  {...field}
                  onChange={(e) => setAsssuffix(e.target.value)}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          onClick={async () =>
            click(
              input1,
              input2,
              output,
              srtsuffix,
              asssuffix,
              (log) => setLogtext((prev) => prev + log) // 实时更新日志
            )
          }
        >
          提交
        </Button>
        <FormField
          control={form.control}
          name="日志信息"
          render={({ field }) => (
            <FormItem>
              <FormLabel>日志</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="日志记录..."
                  className="logtext"
                  {...field}
                  value={logtext}
                  maxLength={10}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button onClick={() => setLogtext("")}>清空</Button>
      </form>
    </Form>
  );
}
