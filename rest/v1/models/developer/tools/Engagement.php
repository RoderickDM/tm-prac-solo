<?php
class ToolsEngagement
{
    public $tools_engagement_aid;
    public $tools_engagement_is_active;
    public $tools_engagement_id;
    public $tools_engagement_name;
    public $tools_engagement_description;
    public $tools_engagement_created_at;
    public $tools_engagement_updated_at;

    public $employee_aid;

    public $tools_engagement_start;
    public $tools_engagement_total;
    public $tools_engagement_search;

    public $connection;
    public $lastInsertedId;
    public $tblToolsEngagement;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblToolsEngagement = "parrot_tools_engagement";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblToolsEngagement} ";
            $sql .= "( tools_engagement_id, "; 
            $sql .= "tools_engagement_name, ";
            $sql .= "tools_engagement_description, ";
            $sql .= "tools_engagement_is_active, ";
            $sql .= "tools_engagement_created_at, ";
            $sql .= "tools_engagement_updated_at ) values ( ";
            $sql .= ":tools_engagement_id, "; 
            $sql .= ":tools_engagement_name, ";
            $sql .= ":tools_engagement_description, ";
            $sql .= ":tools_engagement_is_active, ";
            $sql .= ":tools_engagement_created_at, ";
            $sql .= ":tools_engagement_updated_at ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "tools_engagement_id" => $this->tools_engagement_id,
                "tools_engagement_name" => $this->tools_engagement_name,
                "tools_engagement_description" => $this->tools_engagement_description,
                "tools_engagement_is_active" => $this->tools_engagement_is_active,
                "tools_engagement_created_at" => $this->tools_engagement_created_at,
                "tools_engagement_updated_at" => $this->tools_engagement_updated_at,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all
    public function readAll()
    {
        try {
            $sql = "select ";
            $sql .= "* ";
            $sql .= "from {$this->tblToolsEngagement} ";
            $sql .= "order by tools_engagement_is_active desc, ";
            $sql .= "tools_engagement_name asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readLimit()
    {
        try {
            $sql = "select ";
            $sql .= "* ";
            $sql .= "from {$this->tblToolsEngagement} ";
            $sql .= "order by tools_engagement_is_active desc, ";
            $sql .= "tools_engagement_name asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->tools_engagement_start - 1,
                "total" => $this->tools_engagement_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

     //search
     public function search()
     {
         try {
             $sql = "select ";
             $sql .= "* ";
             $sql .= "from {$this->tblToolsEngagement} ";
             $sql .= "where tools_engagement_name like :search ";
             $sql .= "order by tools_engagement_is_active desc, ";
             $sql .= "tools_engagement_name asc ";
             $query = $this->connection->prepare($sql);
             $query->execute([
                 "search" => "%{$this->tools_engagement_search}%",
             ]);
         }  catch (PDOException $ex) {
             $query = false;
         }
         return $query;
         
     }
 

    // read by id
    public function readById()
    {
        try {
            $sql = "select * from {$this->tblToolsEngagement} ";
            $sql .= "where tools_engagement_aid = :tools_engagement_aid ";
            $sql .= "order by tools_engagement_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "tools_engagement_aid" => $this->tools_engagement_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update
    public function update()
    {
        try {
            $sql = "update {$this->tblToolsEngagement} set ";
            $sql .= "tools_engagement_id = :tools_engagement_id, ";
            $sql .= "tools_engagement_name = :tools_engagement_name, ";
            $sql .= "tools_engagement_description = :tools_engagement_description, ";
            $sql .= "tools_engagement_updated_at = :tools_engagement_updated_at ";
            $sql .= "where tools_engagement_aid = :tools_engagement_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "tools_engagement_id" => $this->tools_engagement_id,
                "tools_engagement_name" => $this->tools_engagement_name,
                "tools_engagement_description" => $this->tools_engagement_description,
                "tools_engagement_updated_at" => $this->tools_engagement_updated_at,
                "tools_engagement_aid" => $this->tools_engagement_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // active
    public function active()
    {
        try {
            $sql = "update {$this->tblToolsEngagement} set ";
            $sql .= "tools_engagement_is_active = :tools_engagement_is_active, ";
            $sql .= "tools_engagement_updated_at = :tools_engagement_updated_at ";
            $sql .= "where tools_engagement_aid = :tools_engagement_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "tools_engagement_is_active" => $this->tools_engagement_is_active,
                "tools_engagement_updated_at" => $this->tools_engagement_updated_at,
                "tools_engagement_aid" => $this->tools_engagement_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // delete
    public function delete()
    {
        try {
            $sql = "delete from {$this->tblToolsEngagement} ";
            $sql .= "where tools_engagement_aid = :tools_engagement_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "tools_engagement_aid" => $this->tools_engagement_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
 
    // name
    public function checkName()
    {
        try {
            $sql = "select tools_engagement_name from {$this->tblToolsEngagement} ";
            $sql .= "where tools_engagement_name = :tools_engagement_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "tools_engagement_name" => "{$this->tools_engagement_name}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
