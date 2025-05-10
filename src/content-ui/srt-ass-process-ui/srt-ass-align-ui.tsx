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
import { useRef, useState } from "react";
import { SRTASSAlign } from "@models/srt-ass-process/srt-ass-align";
import { FolderSelector } from "@models/local-process/folder-selector";

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
  //聚焦测试 必须要注意inputRef.current是否为空，并且还要注意useRef链家类型参数：HTMLTextAreaElement
  const inputRef = useRef<HTMLTextAreaElement>(null);

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
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: "10px",
                }}
              >
                <FormControl>
                  <Input
                    placeholder="请输入SRT字幕所在的目录"
                    {...field}
                    onChange={(e) => setInput1(e.target.value)}
                    value={input1}
                  />
                </FormControl>
                <Button
                  onClick={async () => {
                    const result = await FolderSelector();
                    if (result) {
                      setInput1(result);
                    }
                  }}
                >
                  搜索
                </Button>
              </div>
              <FormDescription></FormDescription>
              <FormMessage />
              <FormLabel>ASS输入目录</FormLabel>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: "10px",
                }}
              >
                <FormControl>
                  <Input
                    placeholder="请输入ASS字幕所在的目录"
                    {...field}
                    onChange={(e) => setInput2(e.target.value)}
                    value={input2}
                  />
                </FormControl>
                <Button
                  onClick={async () => {
                    const result = await FolderSelector();
                    if (result) {
                      setInput2(result);
                    }
                  }}
                >
                  搜索
                </Button>
              </div>
              <FormDescription></FormDescription>
              <FormMessage />
              <FormLabel>SRT字幕输出目录</FormLabel>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: "10px",
                }}
              >
                <FormControl>
                  <Input
                    placeholder="请输入SRT字幕输出的目录"
                    {...field}
                    onChange={(e) => setOutput(e.target.value)}
                    value={output}
                  />
                </FormControl>
                <Button
                  onClick={async () => {
                    const result = await FolderSelector();
                    if (result) {
                      setOutput(result);
                    }
                  }}
                >
                  搜索
                </Button>
              </div>
              <FormDescription></FormDescription>
              <FormMessage />
              <FormLabel>SRT字幕后缀</FormLabel>
              <FormControl>
                <Input
                  placeholder="请输入SRT字幕后缀，例如：.jp.srt"
                  {...field}
                  onChange={(e) => setSrtsuffix(e.target.value)}
                  value={srtsuffix}
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
                  value={asssuffix}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div
          style={{
            display: "flex",
            gridTemplateColumns: "1fr auto",
            gap: "20px",
          }}
        >
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
          <Button
            onClick={() => {
              setInput1("");
              setInput2("");
              setOutput("");
              setSrtsuffix("");
              setAsssuffix("");
            }}
          >
            重置
          </Button>
        </div>
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
                  ref={inputRef}
                  value={logtext}
                  maxLength={10}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          onClick={() => {
            setLogtext("");
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }}
        >
          清空
        </Button>
      </form>
    </Form>
  );
}
