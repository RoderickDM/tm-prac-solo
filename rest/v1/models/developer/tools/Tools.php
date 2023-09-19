<?php
class Tools
{
    public $tools_aid;
    public $tools_is_active;
    public $tools_title;
    public $tools_description;
    public $tools_created_at;
    public $tools_updated_at;

    public $employee_aid;

    public $tools_start;
    public $tools_total;
    public $tools_search;

    public $connection;
    public $lastInsertedId;
    public $tblTools;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblTools = "parrot_tools";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblTools} ";
            $sql .= "( tools_title, "; 
            $sql .= "tools_description, ";
            $sql .= "tools_is_active, ";
            $sql .= "tools_created_at, ";
            $sql .= "tools_updated_at ) values ( ";
            $sql .= ":tools_title, "; 
            $sql .= ":tools_description, ";
            $sql .= ":tools_is_active, ";
            $sql .= ":tools_created_at, ";
            $sql .= ":tools_updated_at ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "tools_title" => $this->tools_title,
                "tools_description" => $this->tools_description,
                "tools_is_active" => $this->tools_is_active,
                "tools_created_at" => $this->tools_created_at,
                "tools_updated_at" => $this->tools_updated_at,
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
            $sql .= "from {$this->tblTools} ";
            $sql .= "order by tools_is_active desc, ";
            $sql .= "tools_title asc ";
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
            $sql .= "from {$this->tblTools} ";
            $sql .= "order by tools_is_active desc, ";
            $sql .= "tools_title asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->tools_start - 1,
                "total" => $this->tools_total,
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
             $sql .= "from {$this->tblTools} ";
             $sql .= "where tools_title like :search ";
             $sql .= "order by tools_is_active desc, ";
             $sql .= "tools_title asc ";
             $query = $this->connection->prepare($sql);
             $query->execute([
                 "search" => "%{$this->tools_search}%",
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
            $sql = "select * from {$this->tblTools} ";
            $sql .= "where tools_aid = :tools_aid ";
            $sql .= "order by tools_title asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "tools_aid" => $this->tools_aid,
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
            $sql = "update {$this->tblTools} set ";
            $sql .= "tools_title = :tools_title, ";
            $sql .= "tools_description = :tools_description, ";
            $sql .= "tools_updated_at = :tools_updated_at ";
            $sql .= "where tools_aid = :tools_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "tools_title" => $this->tools_title,
                "tools_description" => $this->tools_description,
                "tools_updated_at" => $this->tools_updated_at,
                "tools_aid" => $this->tools_aid,
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
            $sql = "update {$this->tblTools} set ";
            $sql .= "tools_is_active = :tools_is_active, ";
            $sql .= "tools_updated_at = :tools_updated_at ";
            $sql .= "where tools_aid = :tools_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "tools_is_active" => $this->tools_is_active,
                "tools_updated_at" => $this->tools_updated_at,
                "tools_aid" => $this->tools_aid,
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
            $sql = "delete from {$this->tblTools} ";
            $sql .= "where tools_aid = :tools_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "tools_aid" => $this->tools_aid,
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
            $sql = "select tools_title from {$this->tblTools} ";
            $sql .= "where tools_title = :tools_title ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "tools_title" => "{$this->tools_title}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
