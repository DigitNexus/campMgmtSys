"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Dialog } from "@/components/retroui/Dialog";  
import { toast } from "sonner";
import { Input } from "@/components/retroui/Input";
import { Textarea } from "@/components/retroui/Textarea";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [tab, setTab] = useState("all");
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);
  const [c, setC] = useState([]);
  const [form, setForm] = useState({ name: "", startDateandTime: "", endDateandTime: "", url: "", description: "" });

  const fetchCampaigns = async (endpoint = "http://localhost:5050/api/campaign") => {
    try {
      const res = await axios.get(endpoint);
      setCampaigns(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (tab === "all") fetchCampaigns("http://localhost:5050/api/campaign");
    if (tab === "past") fetchCampaigns("http://localhost:5050/api/campaign/past");
    if (tab === "present") fetchCampaigns("http://localhost:5050/api/campaign/present");
    if (tab === "future") fetchCampaigns("http://localhost:5050/api/campaign/future");
  }, [tab]);

  const handleDelete = async (id) => {
    try{
        const res = await axios.delete(`http://localhost:5050/api/campaign/${id}`);
        if(res){
          toast.success("Campaign record deleted successfully", {
      richColors: true,
    })
        }
        else{
          toast.error("COuld not delete the campaign")
        }
        fetchCampaigns(`http://localhost:5050/api/campaign/${tab === "all" ? "" : tab}`);
    }catch(error){
      toast.error(error, {
      richColors: true,
    })
    }
  };

  const handleEdit = async (id) => {
    try{
      const res = await axios.patch(`http://localhost:5050/api/campaign/${id}`, form);
      if(res){
        toast.success("Campaign edited successfully", {
          richColors: true,
        })
        fetchCampaigns(`http://localhost:5050/api/campaign/${tab === "all" ? "" : tab}`);
      }
      else{
        toast.error("Campaign could not be edited", {
      richColors: true,
    })
      }
    }catch(error){
      toast.error(error, {
      richColors: true,
    })
    }
    setEdit(false)
  };

  const editDetails = (c) => {
    setEdit(true)
    setC(c)
    setForm({
      name:c.name,
      description:c.description,
      startDateandTime:c.startDateandTime,
      endDateandTime:c.endDateandTime,
      url:c.url
    })
  }

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5050/api/campaign", form);
      if(res){
        toast.success("Campaign added successfully", {
      richColors: true,
    })
      }
      else{
        toast.error("Campaign could not be added", {
      richColors: true,
    })
      }
    } catch (error) {
      console.log(error)
      toast.error(error)
    }
    setAdd(false);
    fetchCampaigns("http://localhost:5050/api/campaign");
  };

  return (
    <div className="p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4">Campaign Management</h1>    
        <div className="flex gap-3 mb-6">
          <Button variant="default" size="sm" onClick={() => setAdd(true)}>+ New Campaign</Button>
        </div>    
      </div>
      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        {["all", "past", "present", "future"].map((t) => (
          <Button key={t} variant={tab === t ? "default" : "outline"} onClick={() => setTab(t)}>
            {t.toUpperCase()}
          </Button>
        ))}
      </div>

      {/* Campaign List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {campaigns.map((c) => (
          <Card key={c._id}>
            <Card.Content className="p-4">
              <h2 className="text-lg font-semibold break-words">{c.name}</h2>
              <p className="text-sm text-gray-600 break-words">{c.description}</p>
              <p className="text-xs text-gray-500">Start: {new Date(c.startDateandTime).toLocaleString()}</p>
              <p className="text-xs text-gray-500">End: {new Date(c.endDateandTime).toLocaleString()}</p>
              <a href={c.url} className="text-blue-600 text-sm break-words" target="_blank">{c.url}</a>

              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="default" onClick={() => editDetails(c)}>Edit</Button>
                <Button size="sm" variant="default" onClick={() => handleDelete(c._id)}>Delete</Button>
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>

      {/* New Campaign Modal */}
      <Dialog open={add||edit} onOpenChange={()=>{
        if(open){
          setAdd(false)
          setEdit(false)
        }
      }}>
        <Dialog.Content>
          <Dialog.Header>{add?"Add":"Edit"} Campaign</Dialog.Header>
          <div className="space-y-3 p-6 rounded-lg">
            <Input className="w-full border p-2 rounded" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input className="w-full border p-2 rounded" type="datetime-local" value={form.startDateandTime} onChange={(e) => setForm({ ...form, startDateandTime: e.target.value })} />
            <Input className="w-full border p-2 rounded" type="datetime-local" value={form.endDateandTime} onChange={(e) => setForm({ ...form, endDateandTime: e.target.value })} />
            <Input className="w-full border p-2 rounded" placeholder="URL" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
            <Textarea className="w-full border p-2 rounded" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}></Textarea>
            {add && (<Button onClick={handleSubmit}>Save</Button>)}
            {edit && (<Button onClick={()=>handleEdit(c._id)}>Update</Button>)}
          </div>
        </Dialog.Content>
      </Dialog>
    </div>
  );
}
