<?php
class Cloud
{
    public $cloud_aid;
    public $cloud_is_active;
    public $cloud_title;
    public $cloud_description;
    public $cloud_created_at;
    public $cloud_updated_at;

    public $employee_aid;

    public $cloud_start;
    public $cloud_total;
    public $cloud_search;

    public $connection;
    public $lastInsertedId;
    public $tblCloud;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblCloud = "parrot_cloud";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblCloud} ";
            $sql .= "( cloud_title, "; 
            $sql .= "cloud_description, ";
            $sql .= "cloud_is_active, ";
            $sql .= "cloud_created_at, ";
            $sql .= "cloud_updated_at ) values ( ";
            $sql .= ":cloud_title, "; 
            $sql .= ":cloud_description, ";
            $sql .= ":cloud_is_active, ";
            $sql .= ":cloud_created_at, ";
            $sql .= ":cloud_updated_at ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "cloud_title" => $this->cloud_title,
                "cloud_description" => $this->cloud_description,
                "cloud_is_active" => $this->cloud_is_active,
                "cloud_created_at" => $this->cloud_created_at,
                "cloud_updated_at" => $this->cloud_updated_at,
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
            $sql .= "from {$this->tblCloud} ";
            $sql .= "order by cloud_is_active desc, ";
            $sql .= "cloud_title asc ";
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
            $sql .= "from {$this->tblCloud} ";
            $sql .= "order by cloud_is_active desc, ";
            $sql .= "cloud_title asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->cloud_start - 1,
                "total" => $this->cloud_total,
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
             $sql .= "from {$this->tblCloud} ";
             $sql .= "where cloud_title like :search ";
             $sql .= "order by cloud_is_active desc, ";
             $sql .= "cloud_title asc ";
             $query = $this->connection->prepare($sql);
             $query->execute([
                 "search" => "%{$this->cloud_search}%",
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
            $sql = "select * from {$this->tblCloud} ";
            $sql .= "where cloud_aid = :cloud_aid ";
            $sql .= "order by cloud_title asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "cloud_aid" => $this->cloud_aid,
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
            $sql = "update {$this->tblCloud} set ";
            $sql .= "cloud_title = :cloud_title, ";
            $sql .= "cloud_description = :cloud_description, ";
            $sql .= "cloud_updated_at = :cloud_updated_at ";
            $sql .= "where cloud_aid = :cloud_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "cloud_title" => $this->cloud_title,
                "cloud_description" => $this->cloud_description,
                "cloud_updated_at" => $this->cloud_updated_at,
                "cloud_aid" => $this->cloud_aid,
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
            $sql = "update {$this->tblCloud} set ";
            $sql .= "cloud_is_active = :cloud_is_active, ";
            $sql .= "cloud_updated_at = :cloud_updated_at ";
            $sql .= "where cloud_aid = :cloud_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "cloud_is_active" => $this->cloud_is_active,
                "cloud_updated_at" => $this->cloud_updated_at,
                "cloud_aid" => $this->cloud_aid,
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
            $sql = "delete from {$this->tblCloud} ";
            $sql .= "where cloud_aid = :cloud_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "cloud_aid" => $this->cloud_aid,
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
            $sql = "select cloud_title from {$this->tblCloud} ";
            $sql .= "where cloud_title = :cloud_title ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "cloud_title" => "{$this->cloud_title}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
