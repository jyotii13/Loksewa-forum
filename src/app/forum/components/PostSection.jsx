'use client'

import React, { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'




const PostSection = () => {

  const [title, setTitle] = useState('')
  const [subService, setSubservice] = useState('')
  const [content, setContent] = useState('')
  const [link, setLink] = useState('')
  const [file, setFileList] = useState(null)



  const [open, setOpen] = useState(false)

  const [postContent, setPostContent] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFileList(e.target.files);
    }
  };

  const handleSubmit = () => {
    console.log('new post content:', {
      title,
      subService,
      content,
      link,
      file,
    });

    setTitle('')
    setSubservice('')
    setContent('')
    setLink('')
    setFileList(null)

    setPostContent('');
    setOpen(false);
  }
  return (
    <div className="bg-white p-4 border-gray-500 rounded-md shadow mx-full">
      <div className="flex items-center space-x-2 mb-3">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold">
          LA
        </div>
        <span className="text-blue-600 font-semibold">Loksewa Aayog</span>
      </div>

      <textarea
        className="w-full border bg-gray-100 border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
        placeholder="Post something..."
        rows={3}
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      />

      <button
        onClick={() => setOpen(true)}
        className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors"
      >
        Post a new post
      </button>

      {/* DIalog */}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Create a New Post
            </DialogTitle>
            <DialogDescription>
              COnfirm the content of your post and click post
            </DialogDescription>

          </DialogHeader>
          <div className="space-y-3">
            <Label htmlFor="title">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Enter post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

          </div>

          {/* subservice */}
          <div>
            <Label htmlFor="subservice">
              SubService <span className="text-red-500">*</span>
            </Label>
            <Select onValueChange={(value) => setSubservice(value)}
              value={subService}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a subservice" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kharidar">Kharidar</SelectItem>
                <SelectItem value="computerr">Computer</SelectItem>
                <SelectItem value="kharidarr">Kharidarr</SelectItem>
              </SelectContent>

            </Select>
          </div>

          {/* Content Area */}
          <div>
            <Label htmlFor="content">
              Content <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="content"
              placeholder="Whats on your mind?"
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          {/* link */}
          <div>
            <Label htmlFor="link">Link (optional)</Label>
            <Input
              id="link"
              placeholder="Add a link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          {/* file upload area */}
          <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
            <p>Click or drag to upload the file</p>
            <p>Support for bulk upload. only images allowed, max 5MB per file.</p>

            <div className="mt-3 flex justify-center">
              <Label
                htmlFor="file-upload"
                className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
              >Select files</Label>
              <Input
                id="file-upload"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              cancel
            </Button>
            <Button onClick={handleSubmit}>
              Post
            </Button>

          </DialogFooter>

        </DialogContent>
      </Dialog>


    </div>
  )
}

export default PostSection